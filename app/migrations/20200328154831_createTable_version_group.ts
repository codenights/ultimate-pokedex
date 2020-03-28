import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("version_group", table => {
    table.integer("id").unsigned().notNullable().primary();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("version_group");
};
