import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("ability", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("name_en").notNullable();
    table.string("name_fr");
    table.string("name_ja");
    table.text("description").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("ability");
};
