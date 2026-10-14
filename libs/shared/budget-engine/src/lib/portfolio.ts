import type { PortfolioAnalytics } from '@default-project/types';
import type { EngineSnapshot } from './engine-types';

export interface PortfolioSnapshot extends EngineSnapshot {
  project: {
    id: string;
    slug: string;
    name: string;
    city: string;
    status: PortfolioAnalytics['projects'][number]['status'];
    markupBps: number;
  };
}

/**
 * Portfolio rollup across projects (CONTRACTS §3 "Portfolio"); the API adds `cashflow`.
 * Signature by block 01; the body is implemented by block 11.
 */
export function summarizePortfolio(
  snapshots: readonly PortfolioSnapshot[],
): Omit<PortfolioAnalytics, 'cashflow'> {
  void snapshots;
  throw new Error('Not implemented: block 11');
}
