import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';

/** Stub from block 01, registered in AppModule; the owning block fills this folder. */
@Module({ controllers: [AnalyticsController] })
export class AnalyticsModule {}
