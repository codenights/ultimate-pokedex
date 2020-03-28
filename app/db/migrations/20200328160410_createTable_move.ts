import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("move", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("name").notNullable();
    table.text("description").notNullable().defaultTo("");
    table.string("damage_class").notNullable();
    table.integer("type_id").unsigned().notNullable();
    table.integer("accuracy").unsigned();
    table.integer("power").unsigned();
    table.integer("pp").unsigned().notNullable();
    table.integer("priority").notNullable();
    table.integer("critical_rate").notNullable().defaultTo(0);
    table.integer("drain");
    table.integer("flinch_chance").notNullable().defaultTo(0);
    table.integer("healing");

    table.foreign("type_id").references("type.id");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("move");
};
