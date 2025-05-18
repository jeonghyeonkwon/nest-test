import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('trees', function (table) {
    table.string('id', 50);
    table.string('parent_id', 50);
    table.string('user_id', 50);
    table.string('name', 50);
    table.string('tree_type', 10);
  });
}

export async function down(knex: Knex): Promise<void> {}
