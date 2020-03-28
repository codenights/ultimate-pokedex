import * as Knex from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("pokemon", table => {
    // --------------------------------------- //
    // General info
    // --------------------------------------- //
    table.integer("id").unsigned().notNullable().primary();
    table.integer("species_id").unsigned().notNullable();
    table.string("name_en").notNullable();
    table.string("name_fr");
    table.string("name_ja");
    table.integer("base_experience").unsigned().notNullable();
    table.integer("height").unsigned().notNullable();
    table.integer("order").unsigned().notNullable();
    table.integer("weight").unsigned().notNullable();
    table.integer("base_happiness").unsigned().notNullable();
    table.integer("capture_rate").unsigned().notNullable();
    table.integer("gender_rate").notNullable();
    table.boolean("is_default_form").notNullable();

    // --------------------------------------- //
    // Types
    // --------------------------------------- //
    table.integer("type_1_id").unsigned().notNullable();
    table.integer("type_2_id").unsigned();

    table.foreign("type_1_id").references("type.id");
    table.foreign("type_2_id").references("type.id");

    // --------------------------------------- //
    // Stats
    // --------------------------------------- //
    table.integer("stat_hp").unsigned().notNullable();
    table.integer("stat_attack").unsigned().notNullable();
    table.integer("stat_defense").unsigned().notNullable();
    table.integer("stat_special_attack").unsigned().notNullable();
    table.integer("stat_special_defense").unsigned().notNullable();
    table.integer("stat_speed").unsigned().notNullable();

    // --------------------------------------- //
    // Sprites
    // --------------------------------------- //
    table.string("artwork_url").notNullable();
    table.string("sprite_url").notNullable();
    table.string("shiny_sprite_url").notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable("pokemon");
};
