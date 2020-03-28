import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("damage_relation", table => {
    table.integer("type_1").unsigned().notNullable();
    table.foreign("type_1").references("type.id");

    table.integer("type_2").unsigned().notNullable();
    table.foreign("type_2").references("type.id");

    table.string("relation").notNullable();
    table.float("multiplier").unsigned().notNullable();

    table.index(["type_1", "type_2"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("damage_relation");
};
