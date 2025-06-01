import { Module, Global } from '@nestjs/common';
import * as knex from 'knex';

import { ConfigService, ConfigModule } from '@nestjs/config'; // ConfigService와 ConfigModule 불러오기

export const KNEX_TOKEN = 'KNEX_CONNECTION';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: KNEX_TOKEN,
      useFactory: (configService: ConfigService) => {
        return knex({
          client: 'mysql2',
          connection: {
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
          },
          debug: true,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [KNEX_TOKEN],
})
export class KnexModule {}
