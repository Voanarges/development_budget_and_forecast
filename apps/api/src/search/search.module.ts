import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';

/** Stub from block 01, registered in AppModule; the owning block fills this folder. */
@Module({ controllers: [SearchController] })
export class SearchModule {}
