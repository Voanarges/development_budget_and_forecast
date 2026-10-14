#!/bin/bash
# Tests e2e.sh guards: main tree only, --exec runs under the e2e lock and releases it. Bash 3.2.
E2E="$(cd "$(dirname "$0")/.." && pwd)/e2e.sh"
T=$(mktemp -d "${TMPDIR:-/tmp}/e2e-test.XXXXXX"); trap 'rm -rf "$T"' EXIT
export KAIRON_MAIN="$T/main" KAIRON_STATE="$T/state" KAIRON_WT_ROOT="$T/wt" KAIRON_LOCK_ROOT="$T/locks"
mkdir -p "$T/main" "$T/other"; git -C "$T/main" init -q; git -C "$T/other" init -q
FAILS=0
is() { if [ "$2" = "$3" ]; then echo "ok   $1"; else echo "FAIL $1 — got '$2', want '$3'"; FAILS=$((FAILS + 1)); fi; }

(cd "$T/other" && bash "$E2E" --exec true >/dev/null 2>&1); is "refuses outside the main tree" $? 2
(cd "$T/main" && bash "$E2E" --exec sh -c '[ -d "$KAIRON_LOCK_ROOT/e2e" ]'); is "--exec runs under the e2e lock" $? 0
[ -d "$T/locks/e2e" ]; is "lock released afterwards" $? 1
(cd "$T/main" && bash "$E2E" --exec false); is "--exec passes the exit code" $? 1
(cd "$T/main" && bash "$E2E" --bogus >/dev/null 2>&1); is "unknown argument" $? 2

[ "$FAILS" = 0 ] && { echo "e2e tests: PASS"; exit 0; }
echo "e2e tests: $FAILS FAILED"; exit 1
