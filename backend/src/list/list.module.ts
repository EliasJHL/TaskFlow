import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListResolver } from './list.resolver';

@Module({
  providers: [ListService, ListResolver],
  exports: [ListService],
})
export class ListModule {}
