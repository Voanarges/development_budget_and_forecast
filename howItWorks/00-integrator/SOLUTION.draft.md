# SOLUTION — Development Budget & Cost Forecast

<!-- DRAFT (integrator). Lands at the repo root with the final block-00 merge. Fill "What was done" from merged blocks. -->

## 1. What was done
TODO at finish: per merged block, one line plus the commands that prove it (exit codes).

## 2. Assumptions
- **All amounts are net** (excl. 19% VAT). A German developer usually cannot reclaim construction VAT. A VAT toggle is out of scope.
- **Money is integer euro cents** (`Int`), quantities are integer milli-units, rates are basis points. Rounding is half-up away from zero, in exactly two places: the row amount and the markup. Totals are plain sums.
- **Int limit:** every money or quantity DTO field is ≤ 2,000,000,000 (Prisma `Int` is 32-bit, so about €20M per field).
- **The forecast (EAC) per row depends on status:**
  - DONE = actual;
  - CONTRACTED = max(actual, committed);
  - PLANNED/PARTIAL = max(actual, committed + uncontracted remainder).
- A line is over budget only when forecast > approved.
- **The markup applies to the whole approved budget** (land included), 15% by default. `contractPrice = roundHalfUp(approved × (1 + bps/10000))`.
- **CSV delivery import is partial:** valid rows are applied in one transaction and idempotently; bad rows are reported with their row number.
- **Concurrent edits:** last write wins (no real-time collaboration).

## 3. Decisions
- **Stack deviation:** the Kairon Nx workspace (NestJS + Prisma/SQLite + React/Vite + Tailwind) instead of the Next.js + Postgres skeleton. The owner chose it because the workspace and its tooling were ready. Postgres would need a fresh initial migration.
- **One pure engine** `@default-project/budget-engine` (scope:shared). The API and the web app compute identical numbers, and the money logic is tested in one place.
- **One snapshot per project** (`GET /api/projects/:id`) in TanStack Query. Edits are optimistic `setQueryData` calls plus a coalescing save queue (400 ms; flushed on blur, unmount, route change and beforeunload). Every tab recalculates live from the same cache.
- **Parallel delivery:** one git worktree and branch per block, with frozen contracts (`howItWorks/shared/CONTRACTS.md`). Self-service `--no-ff` merges go through `howItWorks/bin/merge-block.sh` (lock, check gate, merge order). Contract changes go through change requests applied by the integrator.

## 4. Out of scope
Auth, multi-currency, multi-tenancy, bank integrations, deploy, audit log, approval workflow, VAT toggle, real CAD drawing (the floor plan is SVG rectangles). TODO at finish: any unmerged W2/W3 blocks.

## 5. Limitations
- SQLite: no case-insensitive `mode`, so search lower-cases in code. The Int cent ceiling is described above.
- Last write wins, with no conflict detection.
- TODO at finish: known gaps from the blocks' HANDOFFs.

## 6. With one more day
TODO at finish (likely: Postgres + BigInt money, an audit log of edits, a VAT toggle, CSV import preview/undo, finishing the stretch blocks).

## How to run
```bash
npm ci
cd apps/api && npx prisma migrate deploy && npx prisma db seed && cd ../..
npm start            # api http://localhost:3454/api, web http://localhost:4274
npx nx run-many -t lint test typecheck build
bash howItWorks/bin/e2e.sh   # Playwright: api 3454 + web preview 4300
```
