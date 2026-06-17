# fs-sv

A SvelteKit monorepo template with typed APIs, PostgreSQL, auth, and a small UI component set.

## Stack

- SvelteKit and Svelte 5
- oRPC and Valibot
- Better Auth
- PostgreSQL and Drizzle ORM
- Tailwind CSS and shadcn-svelte components
- Bun and Turborepo
- Ultracite/Biome

## Quick start

If you created this repo from the template, first rename the `fs-sv` placeholder:

```bash
bun scripts/rename.ts my-project
```

The script prompts to remove itself when done.

Then install dependencies:

```bash
bun install
```

Create `apps/web/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fs-sv
BETTER_AUTH_SECRET=<32+ chars>
BETTER_AUTH_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

Start Postgres and push the schema:

```bash
bun run db:start
bun run db:push
```

Start the app:

```bash
bun run dev
```

Open <http://localhost:5173>.

## Common commands

```bash
bun run dev          # run all dev tasks
bun run dev:web      # run only the SvelteKit app
bun run build        # build all packages/apps
bun run check        # run Ultracite checks
bun run fix          # format and fix lint issues

bun run db:start     # start local Postgres with Docker
bun run db:watch     # run Docker Compose in the foreground
bun run db:stop      # stop local Postgres
bun run db:down      # remove local Postgres containers
bun run db:push      # push schema changes
bun run db:generate  # generate Drizzle migrations
bun run db:migrate   # run Drizzle migrations
bun run db:studio    # open Drizzle Studio
```

## Code tour

```txt
apps/web
  SvelteKit app: routes, components, remote functions, route handlers

packages/api
  oRPC API: schemas, contract, procedures, router

packages/db
  Drizzle schema and database client

packages/env
  typed env validation

packages/auth
  shared auth helpers and schemas
```

Feature work usually starts in `apps/web` and crosses into `packages/api` when it needs server-side behavior. Data access belongs in `packages/db`; env access belongs in `packages/env`.

## UI components

Common components live in `apps/web/src/lib/components/ui`. The template keeps a small starter set plus basic form and app primitives. Add more shadcn-svelte components only when a feature needs them.

## More docs

- [`docs/BOUNDARIES.md`](docs/BOUNDARIES.md) — architecture rules to keep feature work from drifting
- [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md) — evlog conventions for request, API, auth, and client logs
- [`AGENTS.md`](AGENTS.md) — project rules for coding agents
