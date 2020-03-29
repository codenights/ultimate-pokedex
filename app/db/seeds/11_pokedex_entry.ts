import path from "path";
import { readJSON } from "fs-extra";
import * as Knex from "knex";

import { Pokemon, Pokemon8G } from "./types/Pokemon";
import { PokemonSpecies, FlavorTextEntry } from "./types/PokemonSpecies";
import { getDirectoryContent, extractIdFromUrl } from "./utils";

const POKEMON_DIR = path.join(__dirname, "../../../data/pokemon");
const POKEMON_SPECIES_DIR = path.join(
  __dirname,
  "../../../data/pokemon-species"
);
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

type PokedexEntryDatabase = {
  pokemon_id: number;
  version_id: number;
  entry: string;
};

function mapToTable(
  pokedexEntry: FlavorTextEntry,
  pokemon: Pokemon
): PokedexEntryDatabase {
  return {
    pokemon_id: pokemon.id,
    version_id: extractIdFromUrl("version", pokedexEntry.version.url),
    entry: pokedexEntry.flavor_text,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing Pokedex entries...");

  const pokedexEntries: PokedexEntryDatabase[] = [];

  // Prior to 8th gen (excluding Meltan and Melmetal)
  const pokemons = await getDirectoryContent<Pokemon>(POKEMON_DIR);
  const findSpeciesByPokemon = (pokemon: Pokemon) => {
    const speciesId = extractIdFromUrl("pokemon-species", pokemon.species.url);
    return readJSON(path.join(POKEMON_SPECIES_DIR, `${speciesId}.json`));
  };

  for (const pokemon of pokemons) {
    const species: PokemonSpecies = await findSpeciesByPokemon(pokemon);
    const entries = species.flavor_text_entries
      .filter(entry => entry.language.name === "en")
      .map(entry => mapToTable(entry, pokemon));

    pokedexEntries.push(...entries);
  }

  // Missing 7th gen (Meltan and Melmetal) and 8th gen
  const pokemons7g: Pokemon8G[] = await readJSON(POKEMON_7G_FILE);
  const pokemons8g: Pokemon8G[] = await readJSON(POKEMON_8G_FILE);

  for (const pokemon of [...pokemons7g, ...pokemons8g]) {
    const pokedexEntry = {
      pokemon_id: pokemon.id,
      version_id: 26,
      entry: "",
    };

    pokedexEntries.push(pokedexEntry);
  }

  await knex<PokedexEntryDatabase>("pokedex_entry")
    .del()
    .insert(pokedexEntries);
};
