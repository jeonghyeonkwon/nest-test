import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { KnexModule } from 'src/config/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [TreeController],
  providers: [TreeService],
})
export class TreeModule {}
