import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("pokemon_egg_group", table => {
    table.increments("id");

    table.integer("egg_group_id").unsigned().notNullable();
    table.foreign("egg_group_id").references("egg_group.id");

    table.integer("pokemon_id").unsigned().notNullable();
    table.foreign("pokemon_id").references("pokemon.id");

    table.index(["egg_group_id", "pokemon_id"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("pokemon_egg_group");
};
