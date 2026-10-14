---
name: e2e-full
description: Full regression before shipping — runs every lint, unit, typecheck, build and e2e target, reconciles the acceptance registry against tagged tests so no feature silently lost its guard, and pins the current feature. Use before /mr or when asked whether anything old broke.
allowed-tools: Bash(npx nx *), Bash(git *), Bash(grep *), Read, Write, Edit
---

1. `npx nx run-many -t lint test typecheck build` — record every exit code.
2. Start the API (`npx nx serve api`), run the whole e2e suite: `npx nx e2e web-e2e`.
3. **Reconcile the registry.** Every `docs/acceptance/<slug>.md` must have at least one live (not skipped) test tagged `AC:<slug>/` in `apps/web-e2e/src`:
   - record + live test → OK;
   - record without a live test → UNCOVERED (a guard was lost);
   - tag without a record → ORPHAN.
4. **Triage failures:** before any assertion = infrastructure — fix and rerun once; on an assertion = regression — stop, hypotheses, fix the product. At most 3 automatic iterations, then report and ask.
5. **UNCOVERED** → restore the test, or mark the record `status: retired` with a reason. **ORPHAN** → add the record.
6. **Pin the current feature** when all is green: create `docs/acceptance/<slug>.md` — task, "what must not break", AC list, red-proof from `/test-task`.
7. **Report:** table `target | PASS/FAIL/SKIP | reason`, lists OK / UNCOVERED / ORPHAN, any test touched and why. Green only with zero FAIL and zero UNCOVERED.

Never weaken assertions or timeouts, never `.skip`, never bulk-update snapshots. Never report SKIP or UNCOVERED as PASS. Never retry an assertion failure "until green" as if it were infrastructure.
