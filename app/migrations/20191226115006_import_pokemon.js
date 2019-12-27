const path = require("path");
const { readJSON } = require("fs-extra");
const { findEntityByLanguageName, extractIdFromUrl } = require("./utils");

const SPECIES_DIR = path.join(__dirname, "../../data/pokemon-species");
const POKEMON_DIR = path.join(__dirname, "../../data/pokemon");

const { getDirectoryContent } = require("./utils");

const createPokemonTable = knex =>
  knex.schema.createTable("pokemon", table => {
    // --------------------------------------- //
    // General info
    // --------------------------------------- //
    table
      .integer("id")
      .unsigned()
      .notNullable()
      .primary();
    table
      .integer("species_id")
      .unsigned()
      .notNullable();
    table.string("name_en").notNullable();
    table.string("name_fr");
    table.string("name_ja");
    table
      .integer("base_experience")
      .unsigned()
      .notNullable();
    table
      .integer("height")
      .unsigned()
      .notNullable();
    table
      .integer("order")
      .unsigned()
      .notNullable();
    table
      .integer("weight")
      .unsigned()
      .notNullable();
    table
      .integer("base_happiness")
      .unsigned()
      .notNullable();
    table
      .integer("capture_rate")
      .unsigned()
      .notNullable();
    table.integer("gender_rate").notNullable();
    table.boolean("is_default_form").notNullable();

    // --------------------------------------- //
    // Types
    // --------------------------------------- //
    table
      .integer("type_1_id")
      .unsigned()
      .notNullable();
    table.integer("type_2_id").unsigned();

    table.foreign("type_1_id").references("type.id");
    table.foreign("type_2_id").references("type.id");

    // --------------------------------------- //
    // Stats
    // --------------------------------------- //
    table
      .integer("stat_hp")
      .unsigned()
      .notNullable();
    table
      .integer("stat_attack")
      .unsigned()
      .notNullable();
    table
      .integer("stat_defense")
      .unsigned()
      .notNullable();
    table
      .integer("stat_special_attack")
      .unsigned()
      .notNullable();
    table
      .integer("stat_special_defense")
      .unsigned()
      .notNullable();
    table
      .integer("stat_speed")
      .unsigned()
      .notNullable();

    // --------------------------------------- //
    // Sprites
    // --------------------------------------- //
    table.string("artwork_url").notNullable();
    table.string("sprite_url").notNullable();
    table.string("shiny_sprite_url").notNullable();
  });

const findStatByName = (pokemon, statName) =>
  pokemon.stats.find(x => x.stat.name === statName).base_stat;

const findTypeId = slot => pokemon =>
  pokemon.types
    .filter(x => x.slot === slot)
    .map(x => x.type.url)
    .map(url => extractIdFromUrl("type", url))
    .map(Number)[0] || null;

const findType1Id = findTypeId(1);
const findType2Id = findTypeId(2);

const mapPokemonToPokemonDatabase = (species, pokemon) => ({
  id: pokemon.id,
  species_id: species.id,
  name_en: findEntityByLanguageName(species.names, "en").name,
  name_fr: findEntityByLanguageName(species.names, "fr")
    ? findEntityByLanguageName(species.names, "fr").name
    : null,
  name_ja: findEntityByLanguageName(species.names, "roomaji")
    ? findEntityByLanguageName(species.names, "roomaji").name
    : null,
  base_experience: pokemon.base_experience,
  height: pokemon.height,
  order: pokemon.order,
  weight: pokemon.weight,
  base_happiness: species.base_happiness,
  capture_rate: species.capture_rate,
  gender_rate: species.gender_rate,
  is_default_form: pokemon.is_default,
  stat_hp: findStatByName(pokemon, "hp"),
  stat_attack: findStatByName(pokemon, "attack"),
  stat_defense: findStatByName(pokemon, "defense"),
  stat_special_attack: findStatByName(pokemon, "special-attack"),
  stat_special_defense: findStatByName(pokemon, "special-defense"),
  stat_speed: findStatByName(pokemon, "speed"),
  type_1_id: findType1Id(pokemon),
  type_2_id: findType2Id(pokemon),
  artwork_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/artwork/${species.id}.png`,
  sprite_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/sprite/${species.id}.png`,
  shiny_sprite_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/sprite-shiny/${species.id}.png`
});

const findPokemonByVariety = variety => {
  const pokemonId = extractIdFromUrl("pokemon", variety.pokemon.url);
  return readJSON(path.join(POKEMON_DIR, `${pokemonId}.json`));
};

const insertAllPokemons = async knex => {
  const allSpecies = await getDirectoryContent(SPECIES_DIR);

  await knex.transaction(async trx => {
    for (const species of allSpecies) {
      const pokemons = await Promise.all(
        species.varieties.map(findPokemonByVariety)
      );

      for (const pokemon of pokemons) {
        const pokemonDatabase = mapPokemonToPokemonDatabase(species, pokemon);
        await trx.insert(pokemonDatabase).into("pokemon");
      }
    }
  });
};

exports.up = async knex => {
  await createPokemonTable(knex);
  await insertAllPokemons(knex);
};

exports.down = knex => knex.schema.dropTable("pokemon");
