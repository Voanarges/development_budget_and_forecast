---
name: done-check
description: Definition-of-done gate before claiming a task is finished — lint, tests, typecheck, formatting and a test-weakening check, judged by exit codes. Use before saying "done", and always in process mode.
allowed-tools: Bash(npx nx *), Bash(git *)
---

Run each step and report its exit code. "Done" is allowed only if every step exits 0.

1. `npx nx format:write --uncommitted`
2. `npx nx affected -t lint test typecheck --base=HEAD`
3. If `apps/web/src` or any `*.controller.ts` changed: `npx nx e2e web-e2e`
4. Test-weakening check: `git diff HEAD -- '*.spec.ts' '*.spec.tsx'`
   - Fail if the diff removes `expect(` lines, adds `.skip` / `.only` / `xit(`, or loosens a matcher (for example `toEqual` → `toBeTruthy`) without the user asking for it.
5. Red-proof for a bug fix: temporarily revert the fix (`git stash push <file>`), confirm the new test fails, restore it (`git stash pop`), confirm it passes.

Report as a short table: step, command, exit code. If any step fails, say "not done" and fix the cause — never the assertion.
