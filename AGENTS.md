# AGENTS.md

## Repository Intent
- This is a Next.js boilerplate, not a product app; keep examples generic and reusable for new projects.
- Demo domain code such as todos, users, and settings exists to show conventions, not to become business-specific logic.

## Commands
- Use `pnpm`; `pnpm-lock.yaml` is the lockfile and CI installs with pnpm on Node 20.x and 22.x.
- `pnpm dev` starts Next, `pnpm build` builds, and `pnpm start` serves the built app.
- `pnpm lint` runs ESLint with `--fix` only on `src/**/*.{ts,tsx}`; it does not lint root `app/` files.
- `pnpm prettier` formats only `src/**/*.{ts,tsx}`; Husky pre-commit runs `pnpm prettier` then `pnpm lint`, not tests.
- `pnpm test` runs Jest; focus a file with `pnpm test -- src/path/to/file.test.tsx` or a case with `pnpm test -- -t "case name"`.
- `pnpm test:coverage` enforces global 90% coverage thresholds for branches, functions, lines, and statements.
- There is no typecheck script; use `pnpm exec tsc --noEmit` when a focused TS verification is needed.

## Routing And Layers
- Real Next.js App Router routes live in root `app/`; each route should stay a thin wrapper around an FSD page from `src/pages`.
- Root `pages/` is an intentional stub to discourage Pages Router use; do not add route files there, and ignore stale `src/5-pages` wording in docs.
- `src/app` holds app-level providers/styles, not Next route files; `app/layout.tsx` imports `@app/styles/globals.css`, wraps `Providers`, and renders `Navbar`.
- FSD dependency direction is `app -> pages -> widgets -> features -> entities -> shared`; lower layers must not import higher layers.
- Treat each slice `index.ts` as its public API; avoid importing another slice's internal files directly.
- Path aliases are configured for `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`, and `@/*`.

## Folder Roles
- `src/pages`: route-level page components consumed by root `app/*/page.tsx` files.
- `src/widgets`: composed UI blocks such as todo lists, profile sections, and settings panels.
- `src/features`: user actions and workflows such as auth forms, todo creation, theme switching, and notification settings.
- `src/entities`: reusable domain models/UI for demo entities such as `user`, `todo`, and `session`.
- `src/shared`: primitives, layout UI, utilities, and cross-cutting helpers; keep it domain-neutral.

## UI And Styling
- UI primitives live in `src/shared/ui/primitives` and are shadcn v4/base-nova components backed by `@base-ui/react`, not Radix.
- `components.json` aliases shadcn output to `@shared/ui/primitives` and utilities to `@shared/lib/utils`.
- Use `cn` from `@shared/lib/utils` for class merging; it combines `clsx` with `tailwind-merge`.
- Tailwind v4 is wired through `src/app/styles/globals.css` with CSS variables for light/dark themes, `tw-animate-css`, and `shadcn/tailwind.css`.
- Prefer semantic tokens such as `bg-background` and `text-muted-foreground`; there is no DaisyUI setup.
- Follow the existing 4-space, double-quote, semicolon Prettier style; ESLint also enforces sorted imports/exports.

## App Behavior
- `src/app/providers.tsx` is the client provider boundary and currently wraps `AuthProvider` from `@entities/session`.
- Auth is demo-only localStorage state with credentials `admin` / `1234`; replace it when starting a real project instead of building product auth on top of it.
- Protected routes such as `/profile` and `/settings` are client route wrappers using `ProtectedRoute` from `@shared/lib`.
- `next.config.js` enables `cacheComponents` and only allows remote images from `https://i.pravatar.cc`.

## Testing Notes
- Jest uses `next/jest`, `jsdom`, and `jest.setup.tsx` for `@testing-library/jest-dom` plus mocks for `next/navigation`, `next/image`, and `localStorage`.
- Import `routerMocks` from `jest.setup.tsx` when tests need to assert or alter mocked Next navigation.
- Tests live beside slices in `__tests__`; add or update tests with new boilerplate behavior so clones inherit working examples.
- CI currently runs only `pnpm build` and `pnpm lint`, so run Jest locally when behavior changes.

## Repo-Local Instructions
- `.cursorrules` asks for short, shallow functions, early returns, tests for new functions, edge-case tests, and mocked external dependencies.
- `.cursorrules` also asks for `coderabbit --prompt-only -t uncommitted` before finalizing when that CLI is available.
