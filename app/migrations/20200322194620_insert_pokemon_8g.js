const path = require("path");
const { readJSON } = require("fs-extra");

const POKEMON_DIR = path.join(__dirname, "../../data/pokemon-next");
const POKEMON_FILE = path.join(POKEMON_DIR, "8-gen.json");

const mapPokemonToPokemonDatabase = pokemon => ({
  id: pokemon.id,
  species_id: pokemon.id,
  name_en: pokemon.names.en,
  name_fr: pokemon.names.fr,
  name_ja: pokemon.names.ja,
  height: pokemon.height,
  weight: pokemon.weight,
  order: pokemon.id,
  base_happiness: pokemon.baseHappiness,
  base_experience: pokemon.baseExperience,
  capture_rate: pokemon.captureRate,
  gender_rate: pokemon.genderRate,
  is_default_form: true,
  stat_hp: pokemon.stats.hp,
  stat_attack: pokemon.stats.attack,
  stat_defense: pokemon.stats.defense,
  stat_special_attack: pokemon.stats.specialAttack,
  stat_special_defense: pokemon.stats.specialDefense,
  stat_speed: pokemon.stats.speed,
  type_1_id: pokemon.types[0].id,
  type_2_id: pokemon.types[1] ? pokemon.types[1].id : null,
  artwork_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/app/public/artwork/${pokemon.id}.png`,
  sprite_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/app/public/sprite/${pokemon.id}.png`,
  shiny_sprite_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/app/public/sprite-shiny/${pokemon.id}.png`,
});

const mapPokemonToPokemonSpeciesDatabase = pokemon => {
  return {
    pokemon_id: pokemon.id,
    version_id: 26,
    // @TODO: get the actual entry somewhere.
    entry: "",
  };
};

const mapPokemonToAbilityDatabase = (pokemon, ability) => {
  return {
    pokemon_id: pokemon.id,
    // @TODO: `ability` set to `null` don't exist yet in the DB.
    ability_id: ability.id === null ? 1 : ability.id,
    is_hidden: ability.isHidden,
  };
};

const mapPokemonToEggGroupDatabase = (pokemon, eggGroup) => {
  return {
    pokemon_id: pokemon.id,
    egg_group_id: eggGroup.id,
  };
};

const insert8thGenPokemons = async knex => {
  const pokemons = await readJSON(POKEMON_FILE);

  for (const pokemon of pokemons) {
    const pokemonDatabase = mapPokemonToPokemonDatabase(pokemon);
    console.log("Importing pokemon: ", pokemonDatabase.id);

    await knex.insert(pokemonDatabase).into("pokemon");

    await knex
      .insert(mapPokemonToPokemonSpeciesDatabase(pokemon))
      .into("pokedex_entry");

    for (const ability of pokemon.abilities) {
      await knex
        .insert(mapPokemonToAbilityDatabase(pokemon, ability))
        .into("pokemon_ability");
    }

    for (const eggGroup of pokemon.eggGroups) {
      await knex
        .insert(mapPokemonToEggGroupDatabase(pokemon, eggGroup))
        .into("egg_group_pokemon");
    }
  }
};

const delete8thGenPokemons = async knex => {
  await knex("pokedex_entry")
    .where("pokemon_id", ">", 809)
    .andWhere("pokemon_id", "<", 891)
    .del();

  await knex("pokemon_ability")
    .where("pokemon_id", ">", 809)
    .andWhere("pokemon_id", "<", 891)
    .del();

  await knex("egg_group_pokemon")
    .where("pokemon_id", ">", 809)
    .andWhere("pokemon_id", "<", 891)
    .del();

  await knex("pokemon")
    .where("id", ">", 809)
    .andWhere("id", "<", 891)
    .del();
};

exports.up = async knex => {
  await insert8thGenPokemons(knex);
};

exports.down = async knex => {
  await delete8thGenPokemons(knex);
};
