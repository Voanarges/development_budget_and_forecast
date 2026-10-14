import { z } from 'zod';
import {
  cashflowMonthSchema,
  isoDateSchema,
  portfolioAnalyticsSchema,
  portfolioProjectSchema,
} from '@default-project/types';

// TODO CR-11: the per-project fields below are proposed for `portfolioProjectSchema` (optional there);
// our own endpoint always sends them, so they are required here.
export const deliveryStatsSchema = z.object({
  deliveredRows: z.number().int(),
  onTimeRows: z.number().int(),
  overdueItems: z.number().int(),
});

export const analyticsProjectSchema = portfolioProjectSchema.extend({
  startDate: isoDateSchema,
  endDate: isoDateSchema,
  overrunLineCount: z.number().int().nonnegative(),
  cashflow: z.array(cashflowMonthSchema),
  delivery: deliveryStatsSchema,
});

export const analyticsResponseSchema = portfolioAnalyticsSchema.extend({
  projects: z.array(analyticsProjectSchema),
});

export type DeliveryStats = z.infer<typeof deliveryStatsSchema>;
export type AnalyticsProject = z.infer<typeof analyticsProjectSchema>;
export type AnalyticsResponse = z.infer<typeof analyticsResponseSchema>;
