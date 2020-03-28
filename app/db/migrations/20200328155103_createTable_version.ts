import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("version", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("color").notNullable();
    table.string("name_en").notNullable();
    table.integer("version_group_id").unsigned();

    table.foreign("version_group_id").references("version_group.id");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("version");
};
