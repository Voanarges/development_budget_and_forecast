# 11 — "Analytics": portfolio of projects in numbers and charts

> **Parallel launch:** first read [../PARALLEL-RUN.md](../PARALLEL-RUN.md). Gate, base branch, merge order and your files are in `bin/blocks.conf` (row `11`). Start: `bash $BIN/bootstrap.sh 11` (in the background) → brainstorm into `DESIGN.md` → code in `$WT` → `bash $BIN/check.sh 11` → `bash $BIN/merge-block.sh 11`.

**Wave:** W2 · **Priority:** STRETCH · **Estimate:** 60 min · **Worktree:** `Kairon-wt/11-analytics` (gate and base: `bin/blocks.conf`)
**In parallel:** 10 deliveries publishes `GET /projects/:id/deliveries` (HANDOFF 10). Delivery KPIs are optional: if 10 is not merged yet, hide that block behind a check. Reuse **06's chart components** (`features/profitability/charts/`, see HANDOFF 06). Don't copy them. 06 runs in parallel: start with the engine `portfolio.ts`, the API and the KPIs. Take the charts after `06.merged` (`git -C $WT merge main`). Your merge waits for `06.merged` automatically.

## Goal
A sidebar item `/analytics`: the CFO's 5 answers across the **whole portfolio** and a comparison of projects.

## You own
`apps/api/src/analytics/**`, `apps/web/src/features/analytics/**` (`AnalyticsPage`), the body of `libs/shared/budget-engine/src/lib/portfolio.ts` + spec, `apps/web-e2e/src/analytics.spec.ts`.

## API
`GET /analytics/portfolio` loads every non-template project in **one** query with `include` (no N+1) and returns `summarizePortfolio(snapshots)` + a cash flow per project (`monthlyCashflow`). Query key `['analytics','portfolio']`. Invalidate it after edits: 02's `useEditItem` already invalidates `['projects']`. 02's hooks also invalidate `['analytics']` (CONTRACTS §6).

## Page content
1. A KPI row for the portfolio: Approved, Spent, Open commitments, Forecast (EAC), Variance, Forecast profit, Average margin, Projects over budget (N of M).
2. **Budget vs forecast by project** (grouped bars) + a table of projects (status, % complete by actual/EAC, variance, profit, margin, overrun lines), sortable; a row click → the project.
3. **Portfolio cost structure by category** (stacked bars by project).
4. **Overrun heatmap**: project × category, cell = variance % (from soft green to soft red).
5. **Portfolio cash flow** (cumulative planned/actual/forecast across all projects).
6. (if 10 is merged) Deliveries: % on time, overdue items.
7. Filters: project status, period.

## Acceptance criteria
- AC-11.1 (Jest, engine) `summarizePortfolio`: totals = sums of the per-project `summarizeProject` (exact cents); templates are excluded by the caller.
- AC-11.2 (Jest, API) One `findMany` with `include` (the mock checks there is only one call), `isTemplate:false`.
- AC-11.3 (Vitest) The heatmap gives a red tone to a cell with variance < 0 and green to ≥ 0.
- AC-11.4 (Vitest) An empty portfolio → EmptyState and a CTA "Calculate project".
- AC-11.5 (Vitest) The status filter COMPLETED leaves only Markranstädt (fixture).
