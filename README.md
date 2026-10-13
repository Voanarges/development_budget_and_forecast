# Development Budget / Cost Forecast

The task is described in [TASK.md](TASK.md).

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind)
- Prisma 7 + PostgreSQL 16 (driver adapter `@prisma/adapter-pg`, client singleton in `src/lib/prisma.ts`)

## Run locally

Requires Node.js 22.12+ (or 24) and Docker.

```bash
cp .env.example .env
docker compose up -d        # PostgreSQL on :5432 (override with POSTGRES_PORT)
npm install                 # postinstall runs `prisma generate`
npm run dev                 # http://localhost:3000
```

The Prisma schema (`prisma/schema.prisma`) has no models yet. After adding models, apply them with `npx prisma migrate dev`.
