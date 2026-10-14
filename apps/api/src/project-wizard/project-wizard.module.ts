import { Module } from '@nestjs/common';
import { ProjectWizardController } from './project-wizard.controller';

/** Stub from block 01, registered in AppModule; the owning block fills this folder. */
@Module({ controllers: [ProjectWizardController] })
export class ProjectWizardModule {}
