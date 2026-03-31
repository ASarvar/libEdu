# Architecture Boundaries

This document defines the target module boundaries for gradual refactoring.

## Route Boundaries

- `app/(public)/`: Public pages and marketing routes.
- `app/(auth)/`: Authentication pages such as login and signup.
- `app/(account)/`: Authenticated user self-service pages.
- `app/(admin)/`: Administrative UI routes.
- `app/api/`: API endpoints.

## Code Boundaries

- `features/`: Feature-first business modules (target location for domain logic).
- `shared/`: Reusable UI, utilities, hooks, and low-level primitives.
- `components/`: Existing presentational/UI components (legacy location; migrate gradually).
- `lib/`: Existing infrastructure helpers and server utilities (legacy location; migrate gradually).

## Migration Rules

- New business logic should prefer `features/`.
- New cross-cutting helpers should prefer `shared/`.
- Do not move large existing modules without tests; migrate incrementally.
- Keep route URLs stable while reorganizing internal folders.
