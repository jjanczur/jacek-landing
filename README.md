# Jacek Janczura - AI Architect & CTO

A modern, performant personal website built with [Astro](https://astro.build) showcasing AI
architecture expertise, featuring multilingual support, dynamic animations, and best-in-class web
standards.

## ✨ Features

### Core Functionality

- **🌍 Multilingual**: Full support for English, Polish, and German with automatic language
  detection
- **📝 Content Collections**: MDX-based content management for projects, talks, and notes
- **📱 Responsive Design**: Mobile-first approach with breakpoints optimized for all devices
- **🌓 Dark/Light Theme**: Theme toggle with localStorage persistence and system preference
  detection
- **♿ Accessibility**: WCAG 2.1 AA compliant with keyboard navigation, focus states, and screen
  reader support
- **🎨 Dynamic Animations**: Subtle geometric shape animations in header and hero sections

### Performance & SEO

- **⚡ Performance**: Static site generation with minimal JavaScript (< 1KB)
- **🔍 SEO Optimized**: Meta tags, Open Graph, hreflang alternates, XML sitemap, robots.txt
- **🔒 Security**: Content Security Policy headers and secure defaults
- **📊 Structured Data**: JSON-LD schema markup for enhanced search visibility

### Design System

- **🎨 Modern UI**: Clean, professional design with geometric animations
- **🎯 Visual Feedback**: Form validation states, hover effects, and interactive elements
- **🎭 Color System**: OKLCH color space for consistent theming and better color accuracy
- **📐 Typography**: Lato font family with consistent scale and spacing

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

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd jacek-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

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

- **Framework**: [Astro](https://astro.build) 5.x - Static site generator
- **Language**: TypeScript - Type-safe development
- **Styling**: CSS Custom Properties with OKLCH color space
- **Content**: MDX with Astro Content Collections
- **Animations**: Pure CSS keyframe animations (no JavaScript)
- **Deployment**: GitHub Pages with GitHub Actions
- **Fonts**: Lato (Google Fonts) - Clean, professional typography
- **Validation**: Zod for schema validation

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

## 🎨 Design Features

### Geometric Animations

The site features subtle, randomly-animated geometric shapes in the header and hero sections:

- **Header**: Small diamond, circle, and hexagon shapes with horizontal movement
- **Hero**: Larger shapes (hexagon, triangle, square, circle, diamond, octagon) with random movement
  patterns
- **Accessibility**: Animations respect `prefers-reduced-motion` user preference
- **Performance**: Pure CSS animations with no JavaScript overhead

### Theme System

- **Light/Dark Modes**: Automatic detection with manual toggle
- **OKLCH Colors**: Modern color space for better consistency across themes
- **Smooth Transitions**: Theme switching with CSS custom properties

### Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 900px
- **Desktop**: > 900px

## 📚 Documentation

### Project Documentation

Detailed documentation and specifications are available in the `docs/` directory:

- `requirements.md` - Project requirements and goals
- `implementationPlan.md` - Step-by-step implementation guide
- `components.md` - Component specifications
- `assets.md` - Required images and icons checklist
- `seoPlan.md` - SEO optimization strategy

### UI/UX Review

See `UI_REVIEW.md` for a comprehensive review of UI best practices, accessibility improvements, and
recommendations.

## 🔧 Development

### Code Quality

This project maintains high code quality standards:

- **ESLint**: JavaScript/TypeScript linting with Astro support
- **Prettier**: Code formatting with Astro plugin
- **TypeScript**: Type checking for better development experience
- **GitHub Actions**: Automated quality checks on PRs and pushes

### Development Setup

1. Install recommended VS Code extensions (see `.vscode/extensions.json`)
2. Enable "Format on Save" and "Fix on Save" in your editor settings
3. Run `npm run quality` locally to verify code quality before pushing

### Adding Content

#### Projects

Add new project files to `src/content/projects/`:

```bash
src/content/projects/my-project.en.mdx
```

#### Talks

Add new talk files to `src/content/talks/`:

```bash
src/content/talks/my-talk.en.mdx
```

## 🌐 Deployment

This site is configured for deployment to [GitHub Pages](https://pages.github.com/) with automatic
builds on push to the main branch.

- **Custom Domain**: janczura.com
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Base URL**: Configured in `astro.config.mjs`

## 🤝 Contributing

This is a personal website, but suggestions and improvements are welcome! Please ensure:

- Code follows existing style and patterns
- All quality checks pass (`npm run quality`)
- Accessibility standards are maintained
- Animations respect reduced motion preferences

## 📄 License

See [LICENSE](LICENSE) file for details.

## 👀 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
