import { Module } from '@nestjs/common';
import { LandController } from './land.controller';

/** Stub from block 01, registered in AppModule; the owning block fills this folder. */
@Module({ controllers: [LandController] })
export class LandModule {}
