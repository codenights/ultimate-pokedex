import path from "path";
import { readJSON } from "fs-extra";
import * as Knex from "knex";

import { getDirectoryContent, extractIdFromUrl } from "./utils";
import { PokemonEggGroup } from "../../db/types";
import { EggGroup } from "./types/EggGroup";
import { Pokemon8G } from "./types/Pokemon";

const EGG_GROUP_DIR = path.join(__dirname, "../../../data/egg-group");
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

exports.seed = async (knex: Knex) => {
  console.log("Importing Pokemon / Egg groups...");

  const pokemonEggGroupsEntries: PokemonEggGroup[] = [];
  const eggGroups = await getDirectoryContent<EggGroup>(EGG_GROUP_DIR);

  for (const eggGroup of eggGroups) {
    const eggGroupEntries: PokemonEggGroup[] = eggGroup.pokemon_species.map(
      species => ({
        egg_group_id: eggGroup.id,
        pokemon_id: extractIdFromUrl("pokemon-species", species.url),
      })
    );

    pokemonEggGroupsEntries.push(...eggGroupEntries);
  }

  const pokemons7g: Pokemon8G[] = await readJSON(POKEMON_7G_FILE);
  const pokemons8g: Pokemon8G[] = await readJSON(POKEMON_8G_FILE);

  for (const pokemon of [...pokemons7g, ...pokemons8g]) {
    for (const eggGroup of pokemon.eggGroups) {
      pokemonEggGroupsEntries.push({
        egg_group_id: eggGroup.id,
        pokemon_id: pokemon.id,
      });
    }
  }

  await knex<PokemonEggGroup>("pokemon_egg_group")
    .del()
    .insert(pokemonEggGroupsEntries);
};
