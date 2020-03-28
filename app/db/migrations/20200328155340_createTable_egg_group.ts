import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("egg_group", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("name").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("egg_group");
};
