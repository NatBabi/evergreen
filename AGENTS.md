<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues (using the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical triage roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` and `docs/adr/` at the repo root). See `docs/agents/domain.md`.

## Design Rules (chakaplants.com - Livery v1) - Catalog & Shop Scope
A light interface on a near-white neutral background where a green accent marks the next step. Type is Poppins set tight at large sizes, corners are 8px-14px, and depth comes from soft neutral shadows.

### Core Palette (Chaka Plants)
- **Background:** `#FFFFFF`
- **Surface:** `#F4F7F4`
- **Text:** `#78837C` | **Text Dark (Headings/Card titles):** `#333333`
- **Text Muted:** `#A5AFA8`
- **Border:** `#E2E9E4` | **Input Border:** `#D9E3DC`
- **Accent:** `#198754` (Chaka Emerald Green) | **Accent Hover:** `#146C43`
- **Badge:** `#E8F7EF` background with `#157347` text (20px radius)

### Radii & Corners
- **Card:** 14px (`rounded-[14px]`)
- **Primary Buttons:** 10px (`rounded-[10px]`)
- **Secondary Buttons / Filter Items:** 8px (`rounded-[8px]`)
- **Text Inputs:** 9px (`rounded-[9px]`)
- **Badges:** 20px (`rounded-[20px]`)
- **Pills / Chips:** 9999px (`rounded-full`)

### Typography
- **Font Family:** `Poppins` across headings, cards, and body text.
- **Scale:** display 46px, h1 33px, h2 29px, h3 18px, body 16px, small 14px, caption 13.5px. Weights: 400, 600, 700, 850.

### Shadows & Focus Rings
- **Card Shadow:** `rgba(20, 60, 40, 0.043) 0px 4px 16px 0px`
- **Button Shadow:** `rgba(25, 135, 84, 0.18) 0px 4px 12px 0px`
- **Focus Ring:** `outline: 3px solid rgba(25, 135, 84, 0.45)`
