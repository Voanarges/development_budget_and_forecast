import type { Cashflow } from '@default-project/types';
import type { EngineSnapshot } from './engine-types';

/**
 * Monthly planned / actual / forecast cash flow of a project (CONTRACTS §3 "Cash flow").
 * Signature by block 01; the body is implemented by block 06.
 */
export function monthlyCashflow(
  snapshot: EngineSnapshot,
  today: string,
): Cashflow {
  void snapshot;
  void today;
  throw new Error('Not implemented: block 06');
}
