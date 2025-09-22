# Components Specification

## Layout

- **BaseLayout.astro** — head meta, JSON-LD, hreflang, header/footer, `<slot/>`.
- **NavBar.astro** — brand, nav links, ThemeToggle, LanguageSwitcher, mobile menu.
- **Footer.astro** — ©, social links (LinkedIn, GitHub).

## UI

- **Section.astro** — section wrapper (props: `id`, `variant`).
- **Card.astro** — title, description, tags, optional image/href.
- **Prose.astro** — typography wrapper for MDX content.
- **Tag.astro** — small pill for tech/skills.
- **Icon.astro** — inline SVG wrapper with size/label.

## Content

- **ProjectCard.astro** — renders a project (Problem/Approach/Impact).
- **TalkCard.astro** — title/event/date + VideoEmbed + summary.
- **VideoEmbed.astro** — responsive iframe (YouTube), lazy.
- **TimelineItem.astro** — years, title/company/location, details.

## Utilities

- **ThemeToggle.astro** — toggle `data-theme` with localStorage.
- **LanguageSwitcher.astro** — link to en/pl/de routes for the same page.
