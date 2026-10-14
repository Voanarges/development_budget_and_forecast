import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';

/** Stub from block 01, registered in AppModule; the owning block fills this folder. */
@Module({ controllers: [DeliveriesController] })
export class DeliveriesModule {}
