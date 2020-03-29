import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("pokemon_ability", table => {
    table.increments("id");

    table.integer("pokemon_id").unsigned().notNullable();
    table.foreign("pokemon_id").references("pokemon.id");

    table.integer("ability_id").unsigned().notNullable();
    table.foreign("ability_id").references("ability.id");

    table.boolean("is_hidden").notNullable();

    table.index(["ability_id", "pokemon_id"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("pokemon_ability");
};
