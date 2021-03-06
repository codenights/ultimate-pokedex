import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("color", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("name_en").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("color");
};
