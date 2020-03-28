import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("type", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("color").notNullable();
    table.string("name_en").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("type");
};
