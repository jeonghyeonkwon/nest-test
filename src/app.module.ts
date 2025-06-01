import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { TreeModule } from './tree/tree.module';
import { SeparationModule } from './separation/separation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV,
    }),

    TreeModule,

    SeparationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
