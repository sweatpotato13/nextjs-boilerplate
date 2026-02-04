# Pages Layer

**Path:** `src/pages/`
**FSD Layer:** 5 (pages)

## OVERVIEW

Page components for application routes. Each page corresponds to a route in the App Router.

## STRUCTURE

```
src/pages/
├── home/
│   ├── ui.tsx           # HomePage component
│   ├── index.ts         # Public API export
│   └── __tests__/       # Page tests
├── about/
│   ├── ui.tsx
│   ├── index.ts
│   └── __tests__/
├── login/
├── profile/
├── settings/
└── index.ts             # Barrel exports
```

## CONVENTIONS

- Each page in `app/[route]/page.tsx` imports from here
- Pages are thin wrappers delegating to widgets/features
- Keep page logic minimal - delegate to widgets
- Export via `index.ts` barrel

## WHERE TO LOOK

| Add         | Location                                |
| ----------- | --------------------------------------- |
| New page    | `src/pages/[name]/ui.tsx`               |
| Route setup | `app/[name]/page.tsx`                   |
| Page tests  | `src/pages/[name]/__tests__/*.test.tsx` |

## DEPENDENCIES

Can import from: `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`
