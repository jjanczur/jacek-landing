// Service Worker for caching static assets with long TTLs
// Cache version - increment when you want to force cache refresh
const CACHE_VERSION = 'v1';
const CACHE_NAME = `janczura-static-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/images/headshot.jpg',
  '/favicon.svg',
];

// Cache duration in milliseconds
// 1 year for images and other static assets
const CACHE_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 year

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('janczura-static-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache images, CSS, JS, fonts, and other static assets
  const isStaticAsset =
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot)$/i) ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/_astro/');

  if (isStaticAsset && event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Check if cache is still valid (within duration)
          const cacheDate = cachedResponse.headers.get('sw-cached-date');
          if (cacheDate) {
            const cacheTime = parseInt(cacheDate, 10);
            const now = Date.now();
            if (now - cacheTime < CACHE_DURATION) {
              return cachedResponse;
            }
          } else {
            // If no date header, assume it's valid (for backwards compatibility)
            return cachedResponse;
          }
        }

        // Fetch from network and cache
        return fetch(event.request)
          .then((response) => {
            // Only cache successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add cache date header
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cached-date', Date.now().toString());

            // Store in cache with modified headers
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(
                event.request,
                new Response(responseToCache.body, {
                  status: responseToCache.status,
                  statusText: responseToCache.statusText,
                  headers: headers,
                })
              );
            });

            return response;
          })
          .catch(() => {
            // If fetch fails and we have a cached version, return it even if expired
            return cachedResponse || new Response('Offline', { status: 503 });
          });
      })
    );
  }
});
