import { Module } from '@nestjs/common';
import { SeparationService } from './separation.service';
import { SeparationController } from './separation.controller';
import { KnexModule } from 'src/config/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [SeparationController],
  providers: [SeparationService],
})
export class SeparationModule {}
