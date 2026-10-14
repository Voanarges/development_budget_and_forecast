import { Module } from '@nestjs/common';
import { ArchitectureController } from './architecture.controller';

/** Stub from block 01, registered in AppModule; the owning block fills this folder. */
@Module({ controllers: [ArchitectureController] })
export class ArchitectureModule {}
