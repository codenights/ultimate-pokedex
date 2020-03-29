import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("pokemon_move", table => {
    table.increments("id");
    table.integer("move_id").unsigned().notNullable();
    table.integer("pokemon_id").unsigned().notNullable();
    table.integer("version_group_id").unsigned().notNullable();
    table.string("learn_method").notNullable();
    table.integer("learned_at").unsigned();

    table.foreign("pokemon_id").references("pokemon.id");
    table.foreign("move_id").references("move.id");
    table.foreign("version_group_id").references("version_group.id");

    table.index(["move_id", "pokemon_id"]);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("pokemon_move");
};
