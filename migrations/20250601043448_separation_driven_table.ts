import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('driven_table', function (table) {
    table.string('id', 50);
    table.string('driving_id', 50);
    table.string('name', 50);
    table.string('is_del', 10);
  });
}

export async function down(knex: Knex): Promise<void> {}
