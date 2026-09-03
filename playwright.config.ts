import { defineConfig } from '@playwright/test';

const port = Number(process.env.PW_PORT || 4321);

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  retries: 0,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run build && npm run preview -- --port ${port} --host 127.0.0.1`,
    url: `http://127.0.0.1:${port}/en/`,
    reuseExistingServer: false,
    timeout: 240_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
