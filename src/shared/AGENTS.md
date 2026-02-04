# Shared Layer

**Path:** `src/shared/`
**FSD Layer:** 1 (shared - lowest)

## OVERVIEW

Shared utilities, UI components, and libraries. No business logic here.

## STRUCTURE

```
src/shared/
├── ui/
│   ├── button.tsx       # Reusable Button component
│   ├── navbar.tsx       # Navigation bar
│   ├── terminal-frame.tsx
│   ├── index.ts         # UI barrel export
│   └── __tests__/
├── lib/
│   ├── with-auth.tsx    # HOC for auth protection
│   ├── index.ts         # Lib barrel export
│   └── __tests__/
└── index.ts             # Shared barrel export
```

## CONVENTIONS

- UI components in `ui/` - generic, reusable
- Utilities in `lib/` - helpers, HOCs
- No business logic or domain-specific code
- Export via `index.ts` barrels

## WHERE TO LOOK

| Add                   | Location                                   |
| --------------------- | ------------------------------------------ |
| Reusable UI component | `src/shared/ui/[name].tsx`                 |
| Utility function      | `src/shared/lib/[name].ts`                 |
| HOC                   | `src/shared/lib/[name].tsx`                |
| Shared tests          | `src/shared/{ui,lib}/__tests__/*.test.tsx` |

## DEPENDENCIES

Can import from: nothing (shared is the base layer)
Cannot import from: `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@app/*`
