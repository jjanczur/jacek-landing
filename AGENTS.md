# AGENTS.md

## Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run quality` - Run all checks (lint + format + type-check)
- `npm run lint` / `npm run lint:fix` - ESLint
- `npm run format` / `npm run format:check` - Prettier
- `npm run type-check` - TypeScript/Astro check

## Architecture

Astro 5 static site with MDX support. Structure:

- `src/pages/` - Routes (.astro, .mdx files)
- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layouts
- `src/content/` - MDX content collections
- `src/i18n/` - Internationalization
- `src/utils/` - Utility functions

## Code Style

- TypeScript strict mode, single quotes, semicolons, trailing commas
- 2-space indentation, 80 char line width (100 for markdown)
- Prefix unused args with `_`, avoid `any` (warning)
- Use `const` over `let`, never `var`
- Components: PascalCase.astro
