import path from "path";
import * as Knex from "knex";
import { readJSON } from "fs-extra";

import { Ability } from "./types/Ability";
import { Pokemon8G } from "./types/Pokemon";
import { getDirectoryContent, extractIdFromUrl } from "./utils";

const ABILITY_DIR = path.join(__dirname, "../../../data/ability");
const POKEMON_7G_FILE = path.join(
  __dirname,
  "../../../data/pokemon-next",
  "7-gen.json"
);
const POKEMON_8G_FILE = path.join(
  __dirname,
  "../../../data/pokemon-next",
  "8-gen.json"
);

type PokemonAbilityDatabase = {
  pokemon_id: number;
  ability_id: number;
  is_hidden: boolean;
};

exports.seed = async (knex: Knex) => {
  console.log("Importing Pokemon / Abilities...");

  const pokemonAbilityEntries: PokemonAbilityDatabase[] = [];
  const abilities = await getDirectoryContent<Ability>(ABILITY_DIR);

  for (const ability of abilities) {
    for (const pokemonAbility of ability.pokemon) {
      pokemonAbilityEntries.push({
        pokemon_id: extractIdFromUrl("pokemon", pokemonAbility.pokemon.url),
        ability_id: ability.id,
        is_hidden: pokemonAbility.is_hidden,
      });
    }
  }

  const pokemons7g: Pokemon8G[] = await readJSON(POKEMON_7G_FILE);
  const pokemons8g: Pokemon8G[] = await readJSON(POKEMON_8G_FILE);

  for (const pokemon of [...pokemons7g, ...pokemons8g]) {
    for (const ability of pokemon.abilities) {
      pokemonAbilityEntries.push({
        pokemon_id: pokemon.id,
        ability_id: ability.id,
        is_hidden: ability.isHidden,
      });
    }
  }

  await knex<PokemonAbilityDatabase>("pokemon_ability")
    .del()
    .insert(pokemonAbilityEntries);
};
