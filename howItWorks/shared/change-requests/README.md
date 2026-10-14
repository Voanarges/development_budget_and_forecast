# Change requests (CR) to frozen contracts

File name: `CR-<block>-<slug>.md`, for example `CR-08-room-rotation.md`. The integrator applies CRs between waves (or straight away if it is a blocker), raises `CONTRACT_VERSION` and records it in STATUS.

```md
# CR-NN-slug
- Author: block NN · Date:
- Status: proposed | accepted | applied | rejected (reason)
- Affected: schema / types / engine / registry / package.json
- Blocks affected: 04, 05 …
## What to change (exact diff or field list)
## Why it can't be done inside the block
## Local workaround in the meantime (file with TODO CR-NN)
```

Applied:
- CR-00-contingency-line: the `contingency` section is added to CONSTRUCTION (CONTRACTS §4). Already in contract v1.
- CR-12-wizard-template-route: `GET /projects/wizard/template` (block 12), scaling rule, block-private query keys. Docs only (CONTRACTS §5, §6).
- CR-11-portfolio-extension, CR-05-add-days: accepted, pending the first block-00 merge after `w0-frozen`.
