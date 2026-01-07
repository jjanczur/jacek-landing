# i18n Refactoring Analysis

## Current Problem

You currently maintain **24 separate `.astro` files** (8 pages × 3 languages):
- `src/pages/en/contact.astro`
- `src/pages/de/contact.astro`
- `src/pages/pl/contact.astro`
- ... and 21 more files

**Issues:**
1. **Styling duplication**: ~400-1000 lines of identical CSS per file
2. **Structure duplication**: Same HTML structure repeated 3×
3. **Maintenance burden**: Style changes must be applied 3 times
4. **Inconsistency risk**: Easy to miss updates in one language
5. **Scalability**: Adding a 4th language = 8 more files

## Solution Approaches

### Option 1: JSON Translation Files (Recommended ⭐)

**Structure:**
```
src/
  i18n/
    en/
      contact.json
      index.json
      about.json
      ...
    de/
      contact.json
      ...
    pl/
      contact.json
      ...
  pages/
    contact.astro  (single file, uses translations)
    index.astro
    ...
```

**Pros:**
- ✅ Single source of truth for structure/styling
- ✅ Type-safe with TypeScript
- ✅ Easy to maintain translations
- ✅ No external dependencies
- ✅ Fits your existing pattern (NavBar already uses this)
- ✅ Fast build times (no runtime overhead)
- ✅ Easy to validate missing translations

**Cons:**
- ❌ JSON can be verbose for long content
- ❌ No markdown support in JSON (but can use HTML strings)

**Example Implementation:**

```typescript
// src/i18n/contact/en.json
{
  "meta": {
    "title": "Contact | Jacek Janczura",
    "description": "Get in touch for AI architecture reviews..."
  },
  "hero": {
    "title": "Contact",
    "subtitle": "Let's build responsibly-engineered AI"
  },
  "intro": "Best via the contact form below or LinkedIn...",
  "methods": {
    "form": {
      "title": "Contact Form",
      "description": "For professional inquiries...",
      "emailLabel": "Your email:",
      "messageLabel": "Your message:",
      "submit": "Send Message"
    },
    "linkedin": {
      "title": "LinkedIn",
      "description": "For networking..."
    }
  },
  "focus": {
    "title": "Focus Areas",
    "items": [
      {
        "title": "AI Platform Architecture",
        "description": "Multi-tenant LLM platforms..."
      }
    ]
  }
}
```

```astro
---
// src/pages/contact.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { getTranslations } from '../utils/i18n';

const lang = Astro.url.pathname.split('/')[1] || 'en';
const t = await getTranslations('contact', lang as 'en' | 'pl' | 'de');
---

<BaseLayout 
  title={t.meta.title} 
  description={t.meta.description} 
  lang={lang}
>
  <section class="contact-hero">
    <div class="container">
      <h1>{t.hero.title}</h1>
      <p class="contact-subtitle">{t.hero.subtitle}</p>
    </div>
  </section>
  
  <!-- Rest of structure with {t.methods.form.title}, etc. -->
</BaseLayout>

<style>
  /* All styles in ONE place */
  .contact-hero { ... }
  /* ... */
</style>
```

---

### Option 2: Markdown Translation Files

**Structure:**
```
src/
  i18n/
    en/
      contact.md
    de/
      contact.md
    pl/
      contact.md
```

**Pros:**
- ✅ Better for long-form content
- ✅ Supports markdown formatting
- ✅ Easier for non-technical translators

**Cons:**
- ❌ Less structured than JSON
- ❌ Harder to extract specific fields
- ❌ Need to parse markdown
- ❌ Type safety is more complex

**Best for:** Pages with mostly prose content (blog posts, about pages)

---

### Option 3: Astro i18n Libraries

**Libraries:**
- `@astrojs/i18n` (official, but minimal)
- `astro-i18n-aut` (community)
- `intlayer` (feature-rich)

**Pros:**
- ✅ Full-featured solutions
- ✅ Automatic route generation
- ✅ Built-in SEO helpers
- ✅ TypeScript support

**Cons:**
- ❌ Adds dependencies
- ❌ Learning curve
- ❌ May be overkill for your needs
- ❌ Less control over structure

**Best for:** Complex i18n needs (pluralization, date formatting, etc.)

---

### Option 4: Hybrid Approach (JSON + Markdown)

**Structure:**
```
src/
  i18n/
    en/
      contact.json  (metadata, short strings)
      contact-content.md  (long prose content)
```

**Pros:**
- ✅ Best of both worlds
- ✅ JSON for structured data
- ✅ Markdown for long content

**Cons:**
- ❌ More complex setup
- ❌ Two files per page per language

---

## Recommended Solution: Option 1 (JSON)

### Why JSON is Best for Your Use Case

1. **You already use this pattern** - `NavBar.astro` has an `i18n` object
2. **Most content is structured** - Forms, cards, sections (not long prose)
3. **Type safety** - Can generate TypeScript types from JSON
4. **No dependencies** - Pure Astro/TypeScript
5. **Fast builds** - No runtime overhead

### Implementation Plan

#### Step 1: Create i18n Utility

```typescript
// src/utils/i18n.ts
import type { Lang } from '../types';

export async function getTranslations<T = Record<string, any>>(
  page: string,
  lang: Lang
): Promise<T> {
  const translations = await import(`../i18n/${lang}/${page}.json`);
  return translations.default as T;
}

export function getLangFromPath(pathname: string): Lang {
  const match = pathname.match(/^\/(en|pl|de)/);
  return (match?.[1] || 'en') as Lang;
}
```

#### Step 2: Create Translation Files

```json
// src/i18n/en/contact.json
{
  "meta": {
    "title": "Contact | Jacek Janczura",
    "description": "Get in touch for AI architecture reviews, advisory, and delivery engagements."
  },
  "hero": {
    "title": "Contact",
    "subtitle": "Let's build responsibly-engineered AI"
  },
  "intro": "Best via the contact form below or LinkedIn. I'm open to advisory, architecture reviews, and select delivery engagements focused on enterprise AI platforms.",
  "methods": {
    "form": {
      "title": "Contact Form",
      "description": "For professional inquiries, project discussions, and collaboration opportunities.",
      "emailLabel": "Your email:",
      "messageLabel": "Your message:",
      "submit": "Send Message"
    },
    "linkedin": {
      "title": "LinkedIn",
      "description": "For networking, industry discussions, and professional connections."
    },
    "github": {
      "title": "GitHub",
      "description": "For open source contributions, code reviews, and technical discussions."
    }
  },
  "focus": {
    "title": "Focus Areas",
    "items": [
      {
        "title": "AI Platform Architecture",
        "description": "Multi-tenant LLM platforms, RAG systems, and AI pipeline design"
      },
      {
        "title": "Technical Leadership",
        "description": "Team building, code review culture, and delivery process optimization"
      },
      {
        "title": "Security & Compliance",
        "description": "ISO 27001/SOC 2 implementation and AI-specific risk assessment"
      },
      {
        "title": "System Design",
        "description": "Event-driven microservices, distributed systems, and performance optimization"
      }
    ]
  },
  "cta": {
    "text1": "I work with organizations building enterprise AI solutions that require robust architecture, security-first design, and scalable implementation.",
    "text2": "Currently focusing on LLM platform development, prompt engineering at scale, and AI governance frameworks."
  }
}
```

#### Step 3: Refactor Page Component

```astro
---
// src/pages/contact.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getTranslations, getLangFromPath } from '../../utils/i18n';
import { Mail, Linkedin, Github, Code, Users, Shield, Network, Send } from 'lucide-astro';

const lang = getLangFromPath(Astro.url.pathname);
const t = await getTranslations('contact', lang);
---

<BaseLayout 
  title={t.meta.title} 
  description={t.meta.description} 
  lang={lang}
>
  <section class="contact-hero">
    <div class="container">
      <h1>{t.hero.title}</h1>
      <p class="contact-subtitle">{t.hero.subtitle}</p>
    </div>
  </section>

  <section class="contact-content">
    <div class="container content">
      <div class="contact-intro">
        <p>{t.intro}</p>
      </div>

      <div class="contact-methods">
        <div class="contact-method">
          <div class="contact-icon">
            <Mail size={32} />
          </div>
          <h2>{t.methods.form.title}</h2>
          <p>{t.methods.form.description}</p>
          <form action="https://formspree.io/f/myzngpqa" method="POST" class="contact-form">
            <label class="form-label">
              {t.methods.form.emailLabel}
              <input type="email" name="email" class="form-input" required />
            </label>
            <label class="form-label">
              {t.methods.form.messageLabel}
              <textarea name="message" class="form-textarea" rows="4" required></textarea>
            </label>
            <button type="submit" class="form-submit">
              <Send size={18} />
              {t.methods.form.submit}
            </button>
          </form>
        </div>

        <!-- LinkedIn and GitHub methods similarly -->
      </div>

      <div class="contact-focus">
        <h2>{t.focus.title}</h2>
        <div class="focus-grid">
          {t.focus.items.map((item) => (
            <div class="focus-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div class="contact-cta">
        <p>{t.cta.text1}</p>
        <p>{t.cta.text2}</p>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  /* ALL STYLES IN ONE PLACE - NO DUPLICATION */
  .contact-hero { ... }
  /* ... rest of styles ... */
</style>
```

#### Step 4: Update Astro Config for Dynamic Routes

```typescript
// astro.config.mjs
export default defineConfig({
  // ... existing config
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl', 'de'],
  },
});
```

Then use dynamic routes:
```
src/pages/
  [lang]/
    contact.astro  (handles /en/contact, /pl/contact, /de/contact)
    index.astro
    ...
```

---

## Migration Strategy

### Phase 1: Setup (Low Risk)
1. Create `src/utils/i18n.ts`
2. Create `src/i18n/` directory structure
3. Extract translations from ONE page (e.g., `contact.astro`) as proof of concept

### Phase 2: Migrate Pages One by One
1. Start with simplest page (contact, about)
2. Test thoroughly in all 3 languages
3. Delete old language-specific files after verification
4. Move to next page

### Phase 3: Cleanup
1. Remove old language directories (`src/pages/en/`, `src/pages/de/`, `src/pages/pl/`)
2. Update any hardcoded paths
3. Update sitemap generation if needed

---

## Benefits After Migration

### Before:
- 24 `.astro` files
- ~9,600 lines of duplicated CSS
- 3× maintenance burden

### After:
- 8 `.astro` files (one per page)
- 24 JSON files (translations only)
- Single source of truth for styling
- Easy to add 4th language (just add JSON files)

### Maintenance Example:

**Before:** Change button style
1. Edit `src/pages/en/contact.astro` (line 425)
2. Edit `src/pages/de/contact.astro` (line 425)
3. Edit `src/pages/pl/contact.astro` (line 425)
4. Hope you didn't miss one

**After:** Change button style
1. Edit `src/pages/contact.astro` (line 425)
2. Done ✅

---

## Type Safety (Optional Enhancement)

Generate TypeScript types from JSON:

```typescript
// src/types/translations.ts
export interface ContactTranslations {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  // ... etc
}
```

Then:
```typescript
const t = await getTranslations<ContactTranslations>('contact', lang);
// Full autocomplete and type checking!
```

---

## Recommendation Summary

✅ **Use Option 1: JSON Translation Files**

**Why:**
- Matches your existing pattern
- No dependencies
- Type-safe
- Fast builds
- Easy migration path

**Next Steps:**
1. Review this analysis
2. I can implement the i18n utility and migrate one page as a proof of concept
3. Then migrate remaining pages incrementally

Would you like me to proceed with implementing this solution?

