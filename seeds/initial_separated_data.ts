import { Knex } from 'knex';

import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('driving_table').del();
  await knex('driven_table').del();

  const initDriving = initDrivingFunction();
  // Inserts seed entries

  console.log(initDriving);
  await knex('driving_table').insert(initDriving);

  const drivingIds = initDriving.map((data) => data.id);
  const initDriven = initDrivenFunction(drivingIds);

  await knex('driven_table').insert(initDriven);
}

interface DrivingTable {
  id: string;
  name: string;
}
interface DrivenTable {
  id: string;
  driving_id: string;
  name: string;
  is_del: string;
}

const SIZE = 2002;
function initDrivingFunction(): DrivingTable[] {
  const dtos: DrivingTable[] = new Array();
  for (let i = 0; i < SIZE; i++) {
    const dto = {
      id: uuidv4(),
      order_number: i + 1,
      name: `드라이빙 테이블 ${i + 1}`,
    } as DrivingTable;

    dtos.push(dto);
  }
  return dtos;
}

function initDrivenFunction(drivingIds: string[]): DrivenTable[] {
  const dtos: DrivenTable[] = new Array();
  for (let i = 0; i < SIZE; i++) {
    const dto = {
      id: uuidv4(),
      driving_id: drivingIds[i],
      order_number: i + 1,
      name: `드리븐 테이블 ${i + 1}`,
      is_del: i % 2 == 0 ? 'N' : 'Y',
    } as DrivenTable;

    dtos.push(dto);
  }

  return dtos;
}
