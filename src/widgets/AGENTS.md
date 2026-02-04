# Widgets Layer

**Path:** `src/widgets/`
**FSD Layer:** 4 (widgets)

## OVERVIEW

Independent UI blocks combining features and entities. Widgets are self-contained components for specific UI sections.

## STRUCTURE

```
src/widgets/
├── todo-list/
│   ├── ui.tsx           # TodoListWidget component
│   ├── index.ts         # Public API export
│   └── __tests__/
├── profile-section/
├── settings-widget/
└── index.ts             # Barrel exports
```

## CONVENTIONS

- Combine multiple features into cohesive UI blocks
- Widgets are page-section level components
- Keep widgets focused on specific UI concerns
- Export via `index.ts` barrel

## WHERE TO LOOK

| Add          | Location                                  |
| ------------ | ----------------------------------------- |
| New widget   | `src/widgets/[name]/ui.tsx`               |
| Widget tests | `src/widgets/[name]/__tests__/*.test.tsx` |

## DEPENDENCIES

Can import from: `@features/*`, `@entities/*`, `@shared/*`
Cannot import from: `@pages/*`, `@widgets/*` (other widgets)
