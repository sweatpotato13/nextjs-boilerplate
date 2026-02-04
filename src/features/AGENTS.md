# Features Layer

**Path:** `src/features/`
**FSD Layer:** 3 (features)

## OVERVIEW

User actions and interactive functionality. Features encapsulate complete user workflows.

## STRUCTURE

```
src/features/
├── auth/
│   ├── login-form/
│   │   ├── ui.tsx
│   │   └── index.ts
│   ├── index.ts         # Feature barrel export
│   └── __tests__/
├── todo-operations/
│   ├── create-todo/
│   └── delete-todo/
├── user-settings/
├── theme-switcher/
├── notification-settings/
└── index.ts             # Barrel exports
```

## CONVENTIONS

- Each feature handles one user action
- Features can have multiple slices (sub-features)
- Keep features decoupled from specific pages
- Export via `index.ts` barrel

## WHERE TO LOOK

| Add           | Location                                   |
| ------------- | ------------------------------------------ |
| New feature   | `src/features/[name]/[slice]/ui.tsx`       |
| Feature tests | `src/features/[name]/__tests__/*.test.tsx` |

## DEPENDENCIES

Can import from: `@entities/*`, `@shared/*`
Cannot import from: `@pages/*`, `@widgets/*`, `@features/*` (other features)
