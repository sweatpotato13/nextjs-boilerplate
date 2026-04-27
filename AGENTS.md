# AGENTS.md

Compact repo guidance for future OpenCode sessions. Prefer executable config
over README prose when they disagree.

## Commands

- Package manager: `pnpm` (lockfile is `pnpm-lock.yaml`; no
  `packageManager` field in `package.json`).
- Dev/build: `pnpm dev`, `pnpm build`, `pnpm start`.
- Format/lint are write-fixing and only target `src/**/*.{ts,tsx}`:
  `pnpm prettier`, then `pnpm lint`.
- Tests: `pnpm test`; single/focused test: `pnpm test -- <test-file-or-jest-pattern>`;
  watch: `pnpm test:watch`; coverage: `pnpm test:coverage`.
- There is no standalone `typecheck` script; use `pnpm build` for Next/TS
  validation.
- Husky pre-commit runs only `pnpm prettier` then `pnpm lint`; it does not run
  tests.
- CI (`.github/workflows/nodejs.yaml`) runs build and lint on Node 20.x/22.x;
  no test job is configured.

## Architecture

- Next.js App Router lives in root `app/` and should stay as thin route
  wrappers. Page implementations live in `src/pages/*` and are imported as
  `@pages/<slice>`.
- Root shell is `app/layout.tsx`: imports `@app/styles/globals.css`, wraps with
  `Providers`, and renders `Navbar` from `@shared/ui`.
- `src/app/providers.tsx` is a client component and currently wraps the app with
  `AuthProvider` from `@entities/session`.
- Root `pages/` is an intentional stub to discourage Pages Router usage; do not
  add real routes there.
- FSD layers are `src/shared` → `src/entities` → `src/features` → `src/widgets`
  → `src/pages` → `src/app`. Do not import from higher layers into lower ones.
- Slices expose public APIs through `index.ts`; avoid cross-slice imports from
  internal files when a barrel exists.
- Path aliases in `tsconfig.json`/Jest: `@/*`, `@shared/*`, `@entities/*`,
  `@features/*`, `@widgets/*`, `@pages/*`, `@app/*`.

## UI and styling

- This repo uses Tailwind CSS v4 plus shadcn config; there is no DaisyUI setup.
- Global tokens/theme live in `src/app/styles/globals.css` (`@theme inline`,
  `shadcn/tailwind.css`, `tw-animate-css`). Tailwind config is mostly content
  globs plus a `fade-in` animation.
- `components.json` maps shadcn aliases to FSD locations: components
  `@shared/ui`, primitives `@shared/ui/primitives`, utils
  `@shared/lib/utils`, hooks `@shared/lib/hooks`; icon library is
  `lucide-react`.
- For shadcn-style UI, prefer semantic tokens (`bg-background`,
  `text-muted-foreground`, etc.) and `cn()` from `@shared/lib/utils` over raw
  colors or manual class-string branching.

## Tests

- Jest uses `next/jest`, `jsdom`, and `jest.setup.tsx`.
- Global setup mocks `next/navigation`, `next/image`, and `localStorage`; import
  `routerMocks` from `jest.setup.tsx` when tests need to assert navigation.
- Coverage threshold is 90% globally. Coverage excludes `src/**/index.ts` and
  `src/app/styles/**`.
- Tests are colocated under `__tests__/*.test.tsx`.

## Repo-local conventions

- `.cursorrules` asks for functions under 50 lines, max 3 nesting levels, early
  returns, tests for new functions, edge-case tests, and mocked external deps.
- ESLint enforces sorted imports/exports via `simple-import-sort` and semicolons;
  several `@typescript-eslint/no-unsafe-*` rules and `no-explicit-any` are off,
  so do not assume lint will catch unsafe typing.
- `.cursorrules` also requests `coderabbit --prompt-only -t uncommitted` before
  finalizing, max twice per feature, when that CLI is available.

## Known doc drift

- README still references legacy FSD names like `5-pages`; actual directories are
  `src/pages`, `src/widgets`, etc.
- `pages/README.md` line 18 also mentions `src/5-pages`; treat that as stale.
