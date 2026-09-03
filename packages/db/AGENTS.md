# Database Package Rules

## Boundary

- This package owns the Drizzle schema, migrations, and database factory. Keep runtime configuration in the hosting app and accept it through `createDb(databaseUrl)`.
- Export shared schema and database APIs through `@fs-sv/db`; consumers use package exports rather than relative paths into this package.

## Schema changes

1. Change the schema under `src/schema` and export new public definitions through `src/schema/index.ts`.
2. Generate migrations with `bun run db:generate` from the repository root.
3. Review and commit the generated SQL and migration metadata together.

- `db:push` is for local development; deployed environments apply committed migrations.
- Production migrations run in parallel with application deployment, and previews may share that schema. Keep migrations expand-only: add compatible schema first, then defer destructive cleanup until every deployed version tolerates the removal.
