#!/bin/bash
# The only way to run e2e (or anything that needs the app on 3454/4274/4300): main tree only, one runner
# on the machine (mkdir lock "e2e" from lib.sh, held for the whole run), heavy-slot semaphore.
# Usage: e2e.sh [--grep RE]      run Playwright (list + JSON report), then ac-ledger.sh --e2e-report
#        e2e.sh --exec CMD...    run CMD under the same lock (exploratory scripts, a manual serve check)
# Report: $KAIRON_E2E_REPORT (default /tmp/kairon-e2e/report.json). Exit: the worst of Playwright and ledger;
# 2 = usage / not the main tree.
. "$(dirname "$0")/lib.sh"

GREP="" EXEC=""
case "${1:-}" in
  --grep) GREP="${2:-}"; [ -n "$GREP" ] || die "--grep wants a pattern" 2 ;;
  --exec) EXEC=1; shift; [ $# -gt 0 ] || die "--exec wants a command" 2 ;;
  "") ;;
  *) die "unknown argument: $1 (usage: e2e.sh [--grep RE] | --exec CMD...)" 2 ;;
esac

TOP=$(git rev-parse --show-toplevel 2>/dev/null) || die "not in a git repo" 2
[ "$(cd "$TOP" && pwd -P)" = "$(cd "$MAIN" && pwd -P)" ] || die "e2e runs only in the main tree ($MAIN), not in $TOP (PROTOCOL §7)" 2
cd "$MAIN" || exit 2

log "waiting for the e2e lock"
acquire e2e
trap 'release e2e' EXIT
log "e2e lock taken"

if [ -n "$EXEC" ]; then "$@"; exit $?; fi

REPORT="${KAIRON_E2E_REPORT:-/tmp/kairon-e2e/report.json}"
mkdir -p "$(dirname "$REPORT")"; rm -f "$REPORT"
set -- npx nx e2e web-e2e --outputStyle=static -- --reporter=list,json
[ -n "$GREP" ] && set -- "$@" --grep "$GREP"
PLAYWRIGHT_JSON_OUTPUT_NAME="$REPORT" "$BIN/heavy.sh" "$MAIN" "$@"
PW=$?
row() { printf '%-22s exit %s\n' "$1" "$2"; }
row "playwright" $PW
if [ -s "$REPORT" ]; then
  bash "$BIN/ac-ledger.sh" --root "$MAIN" --e2e-report "$REPORT"; LG=$?
else
  echo "no JSON report at $REPORT (Playwright did not start: infrastructure)"; LG=1
fi
row "ac-ledger --e2e-report" $LG
[ $PW = 0 ] && [ $LG = 0 ] && { echo "E2E: PASS"; exit 0; }
echo "E2E: FAIL"; exit 1
