# Entities Layer

**Path:** `src/entities/`
**FSD Layer:** 2 (entities)

## OVERVIEW

Business entities and domain models. Entities define the core data structures and business logic.

## STRUCTURE

```
src/entities/
├── todo/
│   ├── model.ts         # Business logic, types, stores
│   ├── ui/
│   │   ├── todo-item.tsx
│   │   └── index.ts
│   ├── index.ts         # Entity barrel export
│   └── __tests__/
├── user/
│   ├── model.ts
│   ├── ui/
│   │   ├── user-card.tsx
│   │   └── user-stats.tsx
│   └── index.ts
├── session/
│   ├── model.ts
│   ├── context.tsx      # React context for auth state
│   └── index.ts
└── index.ts             # Barrel exports
```

## CONVENTIONS

- `model.ts` contains types, stores, and business logic
- `ui/` folder for entity-specific UI components
- Entities are pure domain - no UI framework dependencies
- Export via `index.ts` barrel

## WHERE TO LOOK

| Add          | Location                                   |
| ------------ | ------------------------------------------ |
| New entity   | `src/entities/[name]/`                     |
| Entity logic | `src/entities/[name]/model.ts`             |
| Entity UI    | `src/entities/[name]/ui/*.tsx`             |
| Entity tests | `src/entities/[name]/__tests__/*.test.tsx` |

## DEPENDENCIES

Can import from: `@shared/*`, `@entities/*` (other entities)
Cannot import from: `@pages/*`, `@widgets/*`, `@features/*`
