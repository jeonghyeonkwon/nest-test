import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_TOKEN } from 'src/config/knex.module';
import { DrivingTable } from './driving.entity';
import { PagenationDtosV1 } from './dtos/page.dto';

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
  async getList(page: number, size: number) {
    const totalCount = await this.getCountVer2();
    const drivingResult = await this.knex('driving_table')
      .select<DrivingTable[]>('*')
      .orderBy('order_number', 'asc');

    const drivingIds = drivingResult.map((data) => data.id);

    const drivenResult = await this.drivenResultFunction(
      drivingIds,
      page,
      size,
    );
    const result = new PagenationDtosV1(
      totalCount,
      drivenResult,
      page,
      size,
      10,
    );
    console.log(result);
    return result;
  }

  private async drivenResultFunction(
    drivenIds: string[],
    page: number,
    size: number,
  ) {
    const startIndex = (page - 1) * size;
    console.log(startIndex);
    return await this.knex('driven_table')
      .where('is_del', 'N')
      .whereIn('driving_id', drivenIds)
      .orderBy('order_number', 'asc')
      .offset(startIndex)
      .limit(size);
  }
}
