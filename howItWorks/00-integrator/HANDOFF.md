# 00 — Integrator: handoff (kept current during the run)

## For the blocks
- A CR goes to `shared/change-requests/CR-NN-<slug>.md`. The integrator sees it within about 30 s (the watcher), and the answer comes through `note.sh --read NN`.
  - Before `w0-frozen` the frozen files belong to 01/02, so a CR is passed to them.
  - After `w0-frozen` the integrator applies it in its own worktree and merges it as block `00`. Your next `merge-block.sh` picks it up automatically.
- `merge-block.sh` now writes the status `main-dirty <paths>` when it refuses a dirty main, so the board shows who is blocking.
- Block `00` appears on the board (`status.sh`). Its merges `merge: 00-integrator` move main like any other block's.

## Tools (howItWorks/bin)
| Script | What |
|---|---|
| `integrator-watch.sh` | in the background: exits with events `MERGED NN` / `FLAG w0-frozen\|main.broken` / `STATUS NN conflict\|check-failed\|main-dirty` / `CR <file>` / `DIRTY <paths>`; `--once` (exit 3 = quiet); `--ack` after acting |
| `tests/integrator-watch.test.sh` | sandbox test of the watcher and of the `main-dirty` status in `merge-block.sh` (AC-00.5–00.13) |

## Log
- 2026-10-14 11:05: design `DESIGN.md` (A2); watcher + tests green; row `00` in `blocks.conf` (gate `w0-frozen`).
- 11:45: CR-11 (portfolio extension) accepted; queued for the first block-00 batch after `w0-frozen`. Row 00 now also owns `apps/api/.env.example` (no other owner).
- 11:47: CR-12 applied (docs only, CONTRACTS §5/§6). Item 2 (query-keys.ts) resolved as a block-private key, no code change.
- 11:50: CR-05 (engine `addDays`) accepted, batched with CR-11. Row 00 now also owns `budget-engine/src/lib/schedule.ts` + spec.
