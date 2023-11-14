/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("disney", function (table) {
    table.increments("id").primary();
    table.string("name", 128).notNullable();
    table.string("imageUrl", 512);
    table.datetime("createdAt", { useTz: false }).defaultTo(knex.fn.now());
    table.datetime("updatedAt", { useTz: false }).defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("disney");
};
