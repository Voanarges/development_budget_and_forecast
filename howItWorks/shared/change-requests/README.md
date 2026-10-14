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
