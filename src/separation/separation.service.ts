import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_TOKEN } from 'src/config/knex.module';
import { DrivingTable } from './driving.entity';

@Injectable()
export class SeparationService {
  constructor(@Inject(KNEX_TOKEN) private readonly knex: Knex) {}

  async getCount() {
    const drivingResult =
      await this.knex('driving_table').select<DrivingTable[]>('id');

    const drivingIds = drivingResult.map((data) => data.id);

    const drivenResult = await this.knex('driven_table')
      .select(this.knex.raw('COUNT(*) as count'))
      .where('is_del', 'N')
      .whereIn('driving_id', drivingIds);

    return drivenResult[0].count;
  }

  async getCountVer2() {
    const drivingResult =
      await this.knex('driving_table').select<DrivingTable[]>('id');

    const drivingIds = drivingResult.map((data) => data.id);

    let count = 0;
    const chunkSize = 100;
    for (let i = 0; i < drivingIds.length; i += chunkSize) {
      const startIndex = i;
      const endIndex = i + chunkSize;
      const drivenResult = await this.knex('driven_table')
        .select(this.knex.raw('COUNT(*) as count'))
        .where('is_del', 'N')
        .whereIn('driving_id', drivingIds.slice(startIndex, endIndex));

      count += drivenResult[0].count;
    }

    return count;
  }
}
