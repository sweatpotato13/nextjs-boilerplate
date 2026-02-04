# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-04 14:25:00
**Commit:** a83412e
**Branch:** main

---

## OVERVIEW

Next.js 16 + React 19 boilerplate with Feature-Sliced Design (FSD) architecture. Hybrid App Router routing + FSD component organization. Terminal-themed UI with Tailwind CSS + DaisyUI.

---

## STRUCTURE

```
/
├── app/                    # Next.js App Router (routing only)
│   ├── layout.tsx          # Root layout, providers, Navbar
│   ├── page.tsx            # Home (delegates to @pages/home)
│   └── [route]/page.tsx    # Route wrappers
├── src/
│   ├── app/                # FSD app layer (providers, styles)
│   ├── pages/              # FSD pages layer (page components)
│   ├── widgets/            # FSD widgets layer (UI blocks)
│   ├── features/           # FSD features layer (user actions)
│   ├── entities/           # FSD entities layer (business logic)
│   └── shared/             # FSD shared layer (ui, lib)
├── .cursor/rules/          # AI coding rules
├── .claude/skills/         # Claude skills
├── public/                 # Static assets
└── [config files]          # Root configs
```

---

## WHERE TO LOOK

| Task               | Location                  | Notes                                  |
| ------------------ | ------------------------- | -------------------------------------- |
| Add page route     | `app/[name]/page.tsx`     | Wrapper importing from `@pages/[name]` |
| Add page component | `src/pages/[name]/`       | ui.tsx + index.ts barrel               |
| Add widget         | `src/widgets/[name]/`     | ui.tsx + index.ts barrel               |
| Add feature        | `src/features/[name]/`    | Multiple slices allowed                |
| Add entity         | `src/entities/[name]/`    | model.ts + ui/ folder                  |
| Add shared UI      | `src/shared/ui/`          | Custom components                      |
| Add shared lib     | `src/shared/lib/`         | Utilities, HOCs                        |
| Change theme       | `tailwind.config.ts`      | Terminal theme colors                  |
| Update providers   | `src/app/providers.tsx`   | Client-side context                    |
| Add test           | `**/__tests__/*.test.tsx` | Colocated with source                  |

---

## CODE MAP

### Entry Points

| File                    | Purpose                         |
| ----------------------- | ------------------------------- |
| `/app/layout.tsx`       | Root layout, HTML shell, Navbar |
| `/app/page.tsx`         | Home route wrapper              |
| `/app/[route]/page.tsx` | Route wrappers (5 routes)       |
| `src/pages/index.ts`    | FSD pages barrel export         |

### FSD Layers (Bottom → Top)

| Layer    | Path            | Exports Via | Count                    |
| -------- | --------------- | ----------- | ------------------------ |
| shared   | `src/shared/`   | `index.ts`  | 2 (ui, lib)              |
| entities | `src/entities/` | `index.ts`  | 3 (todo, user, session)  |
| features | `src/features/` | `index.ts`  | 5 (auth, todo-ops, etc.) |
| widgets  | `src/widgets/`  | `index.ts`  | 3 (todo-list, etc.)      |
| pages    | `src/pages/`    | `index.ts`  | 5 (home, about, etc.)    |
| app      | `src/app/`      | direct      | providers, styles        |

---

## CONVENTIONS

### FSD Architecture

- **Dependency Rule:** Lower layers cannot import from upper layers
- **Public API:** Each slice exposes ONLY via `index.ts` barrel
- **Path Aliases:** Use `@layer/*` aliases (configured in tsconfig.json)

### Code Style

- **Language:** TypeScript 5.9.3, strict mode
- **Quotes:** Double (`"`)
- **Indent:** 4 spaces
- **Line width:** 80 chars
- **Semicolons:** Required

### Component Structure

```
src/[layer]/[slice]/
├── ui.tsx              # Main component
├── model.ts            # Business logic (entities/features)
├── index.ts            # Public API exports
└── __tests__/          # Tests colocated
    └── *.test.tsx
```

### Testing

- **Framework:** Jest + React Testing Library
- **Location:** Colocated `__tests__/` folders
- **Coverage:** 90% threshold enforced
- **Mocks:** Next.js router, Image, localStorage in `jest.setup.tsx`

---

## ANTI-PATTERNS (THIS PROJECT)

### Critical (MUST NOT)

- Functions > 50 lines
- Nesting > 3 levels
- `any` type without justification
- Disable TypeScript strict mode
- Lower layer import from upper layer
- Skip `index.ts` barrel exports
- Commit without tests passing
- Merge without approval

### Forbidden Technologies

- CSS-in-JS libraries (use Tailwind only)
- Class components (functional only)
- Direct DOM manipulation (use refs)
- Dependencies < 1000 weekly downloads

### Performance (AVOID)

- Barrel file imports from large libs
- Sequential awaits (use Promise.all)
- Inline objects in React.cache()
- Animating SVG directly (wrap div)
- Bundle > 200KB gzipped

### AI Interaction (NEVER)

- Auto-create markdown summaries
- Run CodeRabbit > 2 times/feature
- Use apologies in responses
- Suggest whitespace-only changes
- Summarize changes made

---

## UNIQUE STYLES

### Hybrid App Router + FSD

Next.js App Router (`/app/`) handles routing only. Page components live in FSD layers (`src/pages/`). App Router pages are thin wrappers:

```tsx
// /app/page.tsx
import { HomePage } from "@pages/home";
export default function Page() {
    return <HomePage />;
}
```

### Terminal Theme

Custom DaisyUI theme with JetBrains Mono font:

- Primary: `#00ff41` (green)
- Secondary: `#ffb000` (orange)
- Accent: `#00d9ff` (cyan)
- Error: `#ff0040` (red)

### Stub Pages Directory

`/pages/README.md` exists to prevent accidental Pages Router usage.

---

## COMMANDS

```bash
# Development
pnpm dev              # Next.js dev server

# Build
pnpm build            # Production build
pnpm start            # Start production server

# Quality
pnpm lint             # ESLint with auto-fix
pnpm prettier         # Format code
pnpm test             # Run Jest tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report

# Pre-commit (runs automatically)
pnpm prettier && pnpm lint
```

---

## NOTES

### Path Aliases (tsconfig.json)

```json
"@/*": "./src/*"
"@shared/*": "./src/shared/*"
"@entities/*": "./src/entities/*"
"@features/*": "./src/features/*"
"@widgets/*": "./src/widgets/*"
"@pages/*": "./src/pages/*"
"@app/*": "./src/app/*"
```

### CI/CD Gaps

- `.github/workflows/nodejs.yaml` uses outdated actions (v1/v2)
- No test job in CI (only build + lint)
- No caching for node_modules
- Consider updating to checkout@v4, setup-node@v4

### AI Rules Location

- `.cursor/rules/constitution.mdc` — Core project rules
- `.cursor/rules/typescript.mdc` — TS guidelines
- `.cursor/rules/clean-code.mdc` — Code quality
- `.claude/skills/react-best-practices/AGENTS.md` — React performance

---

## EXTERNAL APIs

Base URL configured in `.env.example`:

- `BASE_URL=https://jsonplaceholder.typicode.com`
