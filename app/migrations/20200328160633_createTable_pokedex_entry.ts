import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("pokedex_entry", table => {
    table.increments("id");

    table.integer("pokemon_id").unsigned().notNullable();
    table.foreign("pokemon_id").references("pokemon.id");

    table.integer("version_id").unsigned().notNullable();
    table.foreign("version_id").references("version.id");

    table.string("entry").notNullable();

    table.index(["version_id", "pokemon_id"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("pokedex_entry");
};
