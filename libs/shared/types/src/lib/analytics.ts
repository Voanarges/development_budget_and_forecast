import { z } from 'zod';
import {
  cashflowMonthSchema,
  categorySummariesSchema,
  profitabilitySchema,
  summarySchema,
} from './budget-summary';
import { projectStatusSchema } from './enums';
import { idSchema } from './money';

export const portfolioProjectSchema = z.object({
  projectId: idSchema,
  slug: z.string(),
  name: z.string(),
  city: z.string(),
  status: projectStatusSchema,
  summary: summarySchema,
  profitability: profitabilitySchema,
  byCategory: categorySummariesSchema,
});
export type PortfolioProject = z.infer<typeof portfolioProjectSchema>;

/** `GET /analytics/portfolio` (block 11). */
export const portfolioAnalyticsSchema = z.object({
  totals: summarySchema,
  /** profitability over the summed totals */
  profitability: profitabilitySchema,
  projects: z.array(portfolioProjectSchema),
  byCategory: categorySummariesSchema,
  cashflow: z.array(cashflowMonthSchema),
});
export type PortfolioAnalytics = z.infer<typeof portfolioAnalyticsSchema>;
