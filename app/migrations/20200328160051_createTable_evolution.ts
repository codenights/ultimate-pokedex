import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("evolution", table => {
    table.increments("id");

    table.integer("evolves_from_id").unsigned().notNullable();
    table.foreign("evolves_from_id").references("pokemon.id");

    table.integer("evolves_to_id").unsigned().notNullable();
    table.foreign("evolves_to_id").references("pokemon.id");

    table.index(["evolves_from_id"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("evolution");
};
