# Requirements — Astro-Only Multilingual Personal Site (Jacek Janczura)

## Goals & Audience

- **Goal:** A fast, static, multilingual personal site that convinces **recruiters, partners,
  collaborators** of senior expertise in AI, prompt engineering, system design, and security.
- **Audience:** Engineering leaders, hiring managers, founders, event organizers.
- **Tone:** Concise, expert, modern. Occasional notes only.

## Platform & Constraints

- **Framework:** Astro (TypeScript). **Static build only** (no SSR, no server funcs).
- **Hosting:** GitHub Pages via GitHub Actions.
- **Domain:** `janczura.com` (configurable) with `CNAME` in repo.
- **Interactivity:** Minimal islands: theme toggle, mobile nav, language switch.
- **Authoring:** MDX + **Astro Content Collections** with **Zod** schemas.
- **i18n:** **EN (default), PL, DE** — language subpaths (`/en`, `/pl`, `/de`).

## Information Architecture & Navigation

**Multi-page (hybrid) chosen for clarity + SEO.**  
Justification vs one-pager: distinct entry points for “hire/verify/learn”, clearer SERP coverage,
and simpler content maintenance.

- `/[lang]/` **Home** — hero, positioning, highlights, featured work.
- `/[lang]/projects` — 3–6 outcome-first case studies.
- `/[lang]/talks` — 3–4 selected talks (YouTube embeds).
- `/[lang]/about` — bio, skills, concise CV timeline.
- `/[lang]/contact` — mailto + LinkedIn.
- `/[lang]/notes` _(optional)_ — rare posts/publications.
- Nav labels (EN/PL/DE):
  - Home / Strona główna / Startseite
  - Projects / Projekty / Projekte
  - Talks / Wystąpienia / Vorträge
  - About / O mnie / Über mich
  - Contact / Kontakt / Kontakt
  - Notes / Notatki / Notizen

## Content Matrix (page → sections → fields)

| Page         | Sections                      | Fields                                                                               |
| ------------ | ----------------------------- | ------------------------------------------------------------------------------------ |
| Home         | Hero                          | name, title, **tagline**, CTA(s), heroImage                                          |
|              | Positioning                   | 2–3 sentences (value to orgs)                                                        |
|              | Highlights                    | 3–4 cards (label, metric/claim, icon)                                                |
|              | Featured Work                 | links to 2 projects + 1 talk                                                         |
|              | Contact CTA                   | headline, short line, link to /contact                                               |
| Projects     | Case studies (cards/sections) | title, period, role, **Problem → Approach → Impact**, tech[], link(s), image?        |
| Talks        | Talk entries                  | title, event, date, **summary (1–2 sentences)**, youtubeId/url, thumbnail (optional) |
| About        | Bio + Timeline + Skills       | shortBio, longBio, timeline[], skills{category→items[]}                              |
| Contact      | Methods                       | email (mailto), LinkedIn URL, GitHub (optional), simple CTA                          |
| Notes (opt.) | List of notes/publications    | title, date, type, externalLink, summary                                             |

## Draft Copy (EN primary; translate to PL/DE later)

### Tagline variants (pick 1)

1. **AI Architect & CTO** — enterprise-grade LLM systems, end-to-end.
2. From **prompt engineering to platform architecture** — AI that ships.
3. **Security-minded AI**: robust design, measurable impact, lower risk.

### Short bio (~120 words)

AI and Cloud Architect with a focus on **LLM platforms, RAG, and secure, scalable systems**.
Co-founder/CTO delivering enterprise AI across insurance, legal, automotive, and real estate. I
design **event-driven microservices** on AWS, integrate multi-model stacks (OpenAI, Azure, Bedrock,
Mistral), and enforce **ISO 27001/SOC 2** practices. I lead teams with SOLID/TDD discipline and
translate business goals into resilient systems that perform under load.

### Long bio (~300 words)

Jacek Janczura is an AI Architect and CTO specializing in **enterprise LLM platforms**,
**retrieval-augmented generation**, and **secure cloud architectures**. He has led multi-tenant
designs integrating AWS Bedrock, Azure ML, OpenAI, and Mistral, and built event-driven backends with
Lambda, ECS/Fargate, SNS/SQS for **high throughput at controlled cost**. Jacek developed internal
tooling like a **prompt-optimization “wizard”** and deterministic **AI pipeline testbeds**, helping
teams move from experiments to reliable production.  
Previously at **idealo**, he delivered high-impact backend features at scale; at **T-Labs**, he
built blockchain systems with Hyperledger; and at **SAS**, he designed real-time analytics for
banking. He holds dual M.Sc. degrees in Computer Science (TU Berlin, PW Warsaw). Jacek works across
**architecture, security, and delivery**, ensuring that AI solutions meet compliance standards and
business KPIs.

### Specializations → value

- **AI platform architecture** — multi-model, multi-tenant, observability built-in.
- **Prompt engineering & RAG** — quality, control, and reproducibility.
- **Distributed systems** — event-driven microservices, streaming, back-pressure.
- **Security & compliance** — ISO 27001/SOC 2 practices without slowing teams.
- **Team leadership** — standards, review culture, CI/CD, test strategy.

### Project blurbs (Problem → Approach → Impact)

1. **entAIngine — Enterprise AI Process Automation**  
   **Problem:** Enterprises need controlled, compliant LLM workflows.  
   **Approach:** Multi-tenant SaaS with RBAC, content routing, and provider-agnostic LLM integration
   (OpenAI/Azure/Bedrock/Mistral).  
   **Impact:** Faster AI adoption; governance + cost controls; production-grade reliability.

2. **entAIgent — No-Code AI Agents**  
   **Problem:** Non-technical teams struggle to orchestrate multi-step agents.  
   **Approach:** Visual builder, team orchestration, tool integrations; safe-guards & evals.  
   **Impact:** Weeks→days to ship agent PoCs; consistent outcomes across teams.

3. **FlowHive — Multi-model AI Workspace**  
   **Problem:** Fragmented tools increase cost and friction.  
   **Approach:** One workspace for research, agents, and analysis with model switching.  
   **Impact:** Reduced tool sprawl and per-seat cost; faster iteration loops.

4. **Valuation Engine — Property Appraisal Copilot**  
   **Problem:** Manual local-market research is slow and error-prone.  
   **Approach:** AI-assisted data aggregation and drafting; structured reports.  
   **Impact:** **~2h saved per report**, higher consistency, easier review.

5. **KnowledgeX — Trusted Analytics Marketplace**  
   **Problem:** Cross-org analytics without exposing data.  
   **Approach:** Blockchain + confidential compute; auditable workflows.  
   **Impact:** Safe collaboration; prototype validated with EU stakeholders.

### Talks (embed these 3)

- **AI Architecture Patterns** — practical lessons from enterprise LLM deployments.  
  YouTube: `https://www.youtube.com/watch?v=Sf61QaWJDjA`
- **Distributed Systems at Scale** — throughput, latency, and resilience trade-offs.  
  YouTube: `https://www.youtube.com/watch?v=fPp66mtx_60`
- **Blockchain & Bitcoin (idealo Tech Talks)** — fundamentals and enterprise use cases.  
  YouTube: `https://www.youtube.com/watch?v=6WzFtN3xWF4`

### Contact copy

**Let’s build responsibly-engineered AI.**  
Best via email or LinkedIn. I’m open to advisory, architecture reviews, and select delivery
engagements.

## Visual Direction

- **Typography:** **Lato** (400/700). Headings tight; body line-height 1.55. Fallback: system-ui.
- **Grid & rhythm:** 12-col responsive grid; spacing scale 4/8/12/16/24/32/48/64.
- **Color tokens (OKLCH idea, CSS vars):**
  - **Light:** bg `#fff`, text `#222`, primary `oklch(0.6 0.15 280)`, accent teal
    `oklch(0.65 0.05 180)`
  - **Dark:** bg `#121212`, text `#eaeaea`, primary `oklch(0.65 0.18 280)`
  - Radii: 6/10/14px; Shadows: subtle layered.
- **Motion:** Subtle opacity/transform; respect `prefers-reduced-motion`.

## Brand Tokens (authoritative)

- Expose tokens in `src/styles/tokens.css` (CSS variables).
- Fonts: `Lato` via Google Fonts (`display=swap`) or self-host WOFF2.
- Theme: **Default Light**, toggle to Dark; persist in `localStorage`.

## SEO & Social

- Titles: “Page | Jacek Janczura”.
- Descriptions: 140–155 chars per page.
- **Open Graph:** `og:title`, `og:description`, `og:image` (1200×630).
- **JSON-LD:** `Person` on Home; `Article` for notes.
- **hreflang:** en / pl / de alternates per page.
- **Sitemap + robots.txt** (allow all).

## Performance & A11y

- Minimal JS (islands for menu/theme only).
- Astro `<Image />` or `astro:assets`; lazy YouTube (or `loading="lazy"`).
- Contrast: WCAG AA. Keyboard nav, visible focus, skip-to-content.
- Lighthouse target ≥95; CLS < 0.1; LCP < 2.5s.

## Security

- No trackers by default.
- **CSP (meta) baseline:**
  `default-src 'self'; img-src 'self' data: https:; script-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; style-src 'self' 'unsafe-inline'; frame-src https://www.youtube.com https://www.youtube-nocookie.com;`
- External embeds limited to YouTube.

## Content Sources Layout

```
src/
  content/
    projects/  (MDX per lang)
    talks/     (MDX per lang)
    notes/     (MDX per lang, optional)
  pages/
    en|pl|de/  (Home, Projects, Talks, About, Contact)
  components/
  layouts/
  styles/      (tokens.css, base.css)
public/
  icons/, images/, CNAME
```

### Collections & Schemas (fields)

- **projects:** { title, period?, role?, tags[], outcome?, image?, links?, lang, body }
- **talks:** { title, event?, date?, youtubeId|videoUrl, description?, lang }
- **notes:** { title, date, type?, link?, summary?, lang, body? }

## Missing Assets

- **Headshot**: 1000×1000, neutral bg.
- **OG image**: 1200×630 (name + title + portrait).
- **Project visuals**: 1200×800 (screens or neutral illustrations).
- **Icons**: LinkedIn, email, GitHub; sun/moon.

## Final Sanity Checks

- All nav links resolve for **EN/PL/DE**.
- `site` + `base` set; Action deploys to Pages; **CNAME** present.
- CSP doesn’t block fonts/YouTube.
- Hreflang set per page; `<html lang>` correct.
- Lighthouse/A11y pass locally before first push.
