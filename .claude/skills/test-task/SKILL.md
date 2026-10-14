---
name: test-task
description: Proves the current task works end to end — a Playwright user-journey test whose acceptance criteria come from the task text, shown red without the fix and green with it. Use when a feature or bug fix is implemented and before claiming it is done.
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(npx nx *), Bash(npx playwright *), Bash(git *)
---

1. **Criteria from the task, not from the screen.** Write AC-1..N from the task text (`docs/tasks/…`, the spec, or the user's exact words for a bug). One statement = one checkable value. Fix them BEFORE touching the fix; narrow a criterion only with the user's words.
2. **Write `apps/web-e2e/src/<slug>.spec.ts`:** open the page → do the action → assert. One decisive `expect` per AC; test titles tagged `AC:<slug>/<n>`. Explicit expectations (`toBeVisible`, `toHaveText`), never `waitForTimeout`.
3. **Add a negative assertion** next to each positive one: no duplicate row, no error banner, no side effect.
4. **Stable selectors:** add `data-testid` or accessible roles to the elements under test instead of brittle CSS.
5. **Run:** start the API (`npx nx serve api` — the e2e web server starts only the web app), then `npx nx e2e web-e2e -- --grep "<slug>"`.
6. **Red-proof:** `git stash push <fix files>` → rerun → the tagged assertion must fail (note which one) → `git stash pop` → rerun → green. A test that was never red proves nothing.
7. **Triage:** failure before any assertion (server down, port busy) = infrastructure — fix and rerun once. Failure on an assertion = regression — stop, list 2–4 hypotheses, fix the product (use `core-debug` if available).
8. **Report:** table `AC | assertion | red? | green?`, commands with exit codes, what is NOT covered. Then `/done-check`.

Never weaken, delete or `.skip` an assertion or raise a timeout to get green. Never change the expected value after a red run without re-running red. A second red on the same criteria means stop tuning and find the root cause. "Done" = every AC green, not "the fix had an effect".
