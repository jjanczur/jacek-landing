# Jacek Janczura - AI Architect & CTO

Personal website built with [Astro](https://astro.build) featuring multilingual support (EN/PL/DE),
content collections, and modern web standards.

## 🚀 Features

- **Multilingual**: English, Polish, and German language support
- **Content Collections**: MDX-based project and talk content management
- **Responsive Design**: Mobile-first approach with CSS custom properties
- **Dark/Light Theme**: Theme toggle with localStorage persistence
- **SEO Optimized**: Meta tags, Open Graph, hreflang, sitemap, robots.txt
- **Performance**: Static generation with minimal JavaScript
- **Security**: CSP headers and secure defaults

## 📁 Project Structure

```
/
├── docs/                    # Documentation and specifications
├── public/                  # Static assets and configuration
│   ├── CNAME               # Custom domain configuration
│   ├── robots.txt          # SEO configuration
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable UI components
│   ├── content/            # MDX content collections
│   │   ├── projects/       # Project case studies
│   │   └── talks/          # Technical talks and presentations
│   ├── layouts/            # Page layout components
│   ├── pages/              # Multi-language page routes
│   │   ├── en/            # English pages
│   │   ├── pl/            # Polish pages
│   │   └── de/            # German pages
│   └── styles/             # CSS tokens and global styles
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `npm install`          | Installs dependencies                             |
| `npm run dev`          | Starts local dev server at `localhost:4321`       |
| `npm run build`        | Build your production site to `./dist/`           |
| `npm run preview`      | Preview your build locally, before deploying      |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check`  |
| `npm run lint`         | Run ESLint on all source files                    |
| `npm run lint:fix`     | Run ESLint with auto-fix                          |
| `npm run format`       | Format all files with Prettier                    |
| `npm run format:check` | Check if files are formatted correctly            |
| `npm run type-check`   | Run TypeScript type checking                      |
| `npm run quality`      | Run all quality checks (lint, format, type-check) |

## 🌐 Deployment

This site is configured for deployment to [GitHub Pages](https://pages.github.com/) with automatic
builds on push to the main branch.

- **Custom Domain**: janczura.com
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 📝 Content Management

Content is managed through MDX files in the `src/content/` directory:

- **Projects**: Case studies with Problem → Approach → Impact structure
- **Talks**: Technical presentations with YouTube embeds
- **Notes**: Blog posts and technical notes (optional)

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x
- **Language**: TypeScript
- **Styling**: CSS Custom Properties (OKLCH color space)
- **Content**: MDX with Astro Content Collections
- **Deployment**: GitHub Pages with GitHub Actions
- **Font**: Lato (Google Fonts)

## 🔍 Code Quality

This project includes comprehensive code quality tools:

- **ESLint**: JavaScript/TypeScript linting with Astro support
- **Prettier**: Code formatting with Astro plugin
- **TypeScript**: Type checking for better development experience
- **GitHub Actions**: Automated quality checks on PRs and pushes

### Development Setup

1. Install recommended VS Code extensions (see `.vscode/extensions.json`)
2. Enable "Format on Save" and "Fix on Save" in your editor settings
3. Run `npm run quality` locally to verify code quality before pushing

### Quality Checks

- **Linting**: Runs on all JavaScript, TypeScript, and Astro files
- **Formatting**: Ensures consistent code style with Prettier
- **Type Checking**: Validates TypeScript types and Astro components
- **CI/CD**: All checks run automatically in GitHub Actions

## 📚 Documentation

Detailed documentation and specifications are available in the `docs/` directory:

- `requirements.md` - Project requirements and goals
- `implementationPlan.md` - Step-by-step implementation guide
- `components.md` - Component specifications
- `assets.md` - Required images and icons checklist
- `seoPlan.md` - SEO optimization strategy

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
