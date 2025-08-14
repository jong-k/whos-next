# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.6 project named "whos-next" built with React 19.1.0, TypeScript, and Tailwind CSS 4. It uses the new App Router architecture and includes Turbopack for fast development builds.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture & Structure

- **Framework**: Next.js 15 with App Router (`src/app/` directory)
- **Styling**: Tailwind CSS 4 with custom CSS variables and dark mode support
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `./src/*`)
- **Fonts**: Uses Geist Sans and Geist Mono from Google Fonts with CSS variables
- **Linting**: ESLint with Next.js TypeScript config

## Key Configuration

- **Path aliases**: `@/*` maps to `./src/*`
- **Dark mode**: Automatic based on system preference (prefers-color-scheme)
- **CSS variables**: Custom color scheme defined in `globals.css` with `--background` and `--foreground`
- **Turbopack**: Enabled by default in development for faster builds

## Project Structure

```
src/app/
├── layout.tsx      # Root layout with font setup and metadata
├── page.tsx        # Home page component
├── globals.css     # Global styles and Tailwind import
└── favicon.ico
```

The project currently contains the default Next.js starter template with Tailwind styling.