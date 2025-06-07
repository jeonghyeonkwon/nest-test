import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('driving_table', function (table) {
    table.string('id', 50);
    table.integer('order_number');
    table.string('name', 50);
  });
}

export async function down(knex: Knex): Promise<void> {}
