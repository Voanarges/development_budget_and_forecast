# default-project

Nx monorepo for live-coding sessions with Claude Code: NestJS + Prisma (SQLite) API, React + Vite web app, Playwright e2e and a shared types library. The `.claude/` kit adds a set of commands for the whole cycle — from a raw task to a shipped branch.

## Quick start

```sh
npm ci
npx nx run api:prisma-migrate -- --name init   # first run only
npx nx serve api                                # http://localhost:3454/api
npx nx serve web                                # http://localhost:4274
npx nx affected -t lint test typecheck --base=HEAD
```

Stack, versions and coding rules: `.claude/CLAUDE.md`.

## Layout

| Path | What |
|---|---|
| `apps/api` | NestJS 11, Prisma 6 (SQLite), class-validator, Jest |
| `apps/web` | React 19, Vite, React Router, TanStack Query, zustand, react-hook-form + zod, Vitest |
| `apps/web-e2e` | Playwright (chromium) |
| `libs/shared/types` | zod schemas and types, imported as `@default-project/types` |
| `docs/tasks/` | task statements with acceptance criteria (`/create-task`) |
| `docs/specs/` | design specs (`/brainstorm`) |
| `docs/acceptance/` | acceptance registry: one file per feature, guarded by tagged e2e tests (`/e2e-full`) |
| `docs/architecture/` | as-built architecture docs, index in its `README.md` (`/update-doc`) |

## Commands

Type them in Claude Code as `/name`. **Who** — whether Claude may start the command on its own or only you can.

### Task cycle

| Command | What it does | When | Who | Output |
|---|---|---|---|---|
| `/create-task` | Turns a raw statement (text, chat quotes, screenshots) into a task with goal, behaviour, atomic acceptance criteria and a how-to-verify path; subagents critique the draft; never writes code | a new task or bug arrives | you or Claude | `docs/tasks/<date>-<slug>.md` |
| `/brainstorm` | Design before code: gathers context, asks one question at a time, proposes 2–3 approaches, runs a prosecutor / advocate / architect / tester panel and a judge, writes the spec, then starts implementing | the approach is not obvious | you or Claude | `docs/specs/<date>-<slug>-design.md` |
| `/scaffold-feature` | Full vertical slice for a new entity: Prisma model and migration, NestJS module with DTOs and tests, shared zod schema, React page with a TanStack Query hook and a test | a new resource, CRUD, list or form | you or Claude | code + tests |
| `/test` | Runs the narrowest relevant unit tests (Jest for api and libs, Vitest for web) | after changing code | you or Claude | exit codes |
| `/test-task` | Proves the task end to end: Playwright test with criteria taken from the task text, red without the fix and green with it, plus negative assertions | a feature or fix is implemented | you or Claude | `apps/web-e2e/src/<slug>.spec.ts` |
| `/update-doc` | Updates the one relevant architecture doc as-built; adds bug history; creates a new doc only for a real gap; refreshes the index | after a verified behaviour change | you or Claude | `docs/architecture/` |
| `/done-check` | Definition of done by exit codes: format, lint, tests, typecheck, e2e when UI or controllers changed, test-weakening check, red-proof for fixes | before saying "done" | you or Claude | table of exit codes |

### Review and shipping

| Command | What it does | When | Who | Output |
|---|---|---|---|---|
| `/self-review` | One-pass review of the diff against the stack checklist | quick check after tests are green | you or Claude | findings with file:line |
| `/review-full` | Adversarial review: prosecutor and defender in parallel, a judge rules on each finding; APPROVE / REQUEST CHANGES / NEEDS DISCUSSION | before `/mr`, or a thorough review | you or Claude | verdict + blocking list |
| `/e2e-full` | Full regression: every lint / test / typecheck / build / e2e target; checks that every registry entry still has a live test; pins the current feature | before `/mr`, or "did anything old break?" | you or Claude | `docs/acceptance/<slug>.md` + report |
| `/mr` | Scoped commits by file name → merge of main → checks → `/review-full` → completeness check → push (asks you) → PR with what / why / how to verify | work is finished | **you only** | commits, PR |
| `/checkout <name>` | New branch from the freshest main, carrying unpushed commits and all uncommitted changes; the source branch is untouched | starting a new branch | **you only** | new branch |
| `/report-tasks [date]` | The day's work across all sessions as "did X so that Y", git as the spine | end of day | **you only** | text in chat |

### Session modes

| Command | What it does |
|---|---|
| `/mode-process` | "Show the process": each prompt gets a checklist injected — restate, plan ≤ 5 steps, failing test first, `/done-check` before "done" |
| `/mode-fast` | Back to the default fast mode. Every new session starts fast |

Claude Code's built-in `/plan` gives a visible planning phase. `core-debug`, `core-explain` and `core-writing-skill` come from the user-level setup when it is present.

### Typical flow

```
/create-task → /brainstorm → code + unit tests → /test-task → /update-doc → /done-check
                                                             ↓
                                   /e2e-full → /review-full → /mr
```

## Guardrails (hooks)

| Hook | Event | What it does |
|---|---|---|
| `block-no-verify.sh` | before Bash | blocks `--no-verify` and `--no-gpg-sign` |
| `guard-command-secrets.sh` | before Bash | blocks cloud keys and `user:token@host` in command text |
| `commit-quality.sh` | before Bash | secret scan of the staged diff, blocks committing `.env` |
| `console-log-check.sh` | after Write / Edit | reminds to use Nest `Logger` instead of `console.log` in `apps/api` |
| `interview-mode.sh` | every prompt | injects the process checklist in process mode, silent otherwise |
| `session-reset.sh` | session start | resets the mode to fast |
| `interview-stop-check.sh` | end of turn | in process mode only: reminds to run lint / test / typecheck; never blocks |

Permissions (`.claude/settings.json`): Nx, npm, Prisma, Playwright, git, `gh` and `jq` run without prompts; `git push` always asks; reading `.env` and `~/.ssh`, and `rm -rf` are denied.

## Not included on purpose

Commands tied to a particular issue tracker, hosting, deploy pipeline, production data or personal tooling (change journal, video transcripts, cross-project sync, account hand-off) are left out. The commands above keep only the part that works the same in any Nx repo.
