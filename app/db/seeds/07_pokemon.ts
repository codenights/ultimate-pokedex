import path from "path";
import { readJSON, pathExists } from "fs-extra";
import * as Knex from "knex";

import { Pokemon, Pokemon8G } from "./types/Pokemon";
import { PokemonSpecies, Variety } from "./types/PokemonSpecies";
import {
  getDirectoryContent,
  findEntityByLanguageName,
  extractIdFromUrl,
} from "./utils";

const PUBLIC_DIR = path.join(__dirname, "../../public");
const SPECIES_DIR = path.join(__dirname, "../../../data/pokemon-species");
const POKEMON_DIR = path.join(__dirname, "../../../data/pokemon");
const POKEMON_FORM_DIR = path.join(__dirname, "../../../data/pokemon-form");
const POKEMON_7G_FILE = path.join(
  __dirname,
  "../../../data/pokemon-next/7-gen.json"
);
const POKEMON_8G_FILE = path.join(
  __dirname,
  "../../../data/pokemon-next/8-gen.json"
);

const findStatByName = (pokemon: Pokemon, statName: string) =>
  pokemon.stats.find(x => x.stat.name === statName).base_stat;

const findTypeId = (slot: number) => (pokemon: Pokemon) =>
  pokemon.types
    .filter(x => x.slot === slot)
    .map(x => x.type.url)
    .map(url => extractIdFromUrl("type", url))
    .map(Number)[0] || null;

const findType1Id = findTypeId(1);
const findType2Id = findTypeId(2);

const findPokemonByVariety = (variety: Variety) => {
  const pokemonId = extractIdFromUrl("pokemon", variety.pokemon.url);
  return readJSON(path.join(POKEMON_DIR, `${pokemonId}.json`));
};

type PokemonDatabase = {
  id: number;
  species_id: number;
  name_en: string;
  name_fr: string;
  name_ja: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  base_happiness: number;
  capture_rate: number;
  gender_rate: number;
  is_default_form: boolean;
  stat_hp: number;
  stat_attack: number;
  stat_defense: number;
  stat_special_attack: number;
  stat_special_defense: number;
  stat_speed: number;
  type_1_id: number;
  type_2_id: number;
  artwork_url: string;
  sprite_url: string;
  shiny_sprite_url: string;
};

async function getPokemonNames(
  species: PokemonSpecies,
  pokemon: Pokemon
): Promise<Pick<PokemonDatabase, "name_en" | "name_fr" | "name_ja">> {
  const names = {
    name_en: findEntityByLanguageName(species.names, "en").name,
    name_fr: findEntityByLanguageName(species.names, "fr")
      ? findEntityByLanguageName(species.names, "fr").name
      : null,
    name_ja: findEntityByLanguageName(species.names, "roomaji")
      ? findEntityByLanguageName(species.names, "roomaji").name
      : null,
  };

  if (pokemon.id < 10000) {
    return names;
  } else {
    const [formInfo] = pokemon.forms;
    const formId = extractIdFromUrl("pokemon-form", formInfo.url);
    const form = await readJSON(path.join(POKEMON_FORM_DIR, `${formId}.json`));

    const rawSuffixEn = findEntityByLanguageName(form.form_names, "en")
      ? findEntityByLanguageName(form.form_names, "en").name
      : "Alt. Form";
    const rawSuffixFr = findEntityByLanguageName(form.form_names, "fr")
      ? findEntityByLanguageName(form.form_names, "fr").name
      : null;
    const rawSuffixJa = findEntityByLanguageName(form.form_names, "roomaji")
      ? findEntityByLanguageName(form.form_names, "roomaji").name
      : null;
    const suffixEn = rawSuffixEn;
    const suffixFr = rawSuffixFr || suffixEn;
    const suffixJa = rawSuffixJa || suffixEn;

    return {
      name_en: `${names.name_en} (${suffixEn})`,
      name_fr: `${names.name_fr} (${suffixFr})`,
      name_ja: `${names.name_ja} (${suffixJa})`,
    };
  }
}

function getArtworkUrl(species: PokemonSpecies, pokemon: Pokemon) {
  const pokemonArtworkUrl = `/artwork/${pokemon.id}.png`;
  const speciesArtworkUrl = `/artwork/${species.id}.png`;
  const pokemonArtworkPath = path.join(PUBLIC_DIR, pokemonArtworkUrl);

  return pathExists(pokemonArtworkPath) ? pokemonArtworkUrl : speciesArtworkUrl;
}

async function mapToTable(
  species: PokemonSpecies,
  pokemon: Pokemon
): Promise<PokemonDatabase> {
  return {
    id: pokemon.id,
    species_id: species.id,
    ...(await getPokemonNames(species, pokemon)),
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
    artwork_url: getArtworkUrl(species, pokemon),
    sprite_url: `/sprite/${species.id}.png`,
    shiny_sprite_url: `/sprite-shiny/${species.id}.png`,
  };
}

function mapPokemon8gToTable(pokemon: Pokemon8G): PokemonDatabase {
  return {
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
    artwork_url: `/artwork/${pokemon.id}.png`,
    sprite_url: `/sprite/${pokemon.id}.png`,
    shiny_sprite_url: `/sprite-shiny/${pokemon.id}.png`,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing Pokemon...");

  const pokemonEntries: PokemonDatabase[] = [];
  const allSpecies = await getDirectoryContent<PokemonSpecies>(SPECIES_DIR);

  for (const species of allSpecies) {
    const pokemons = await Promise.all<Pokemon>(
      species.varieties.map(findPokemonByVariety)
    );

    for (const pokemon of pokemons) {
      const pokemonEntry = await mapToTable(species, pokemon);
      pokemonEntries.push(pokemonEntry);
    }
  }

  const pokemonEntries7g: PokemonDatabase[] = (
    await readJSON(POKEMON_7G_FILE)
  ).map(mapPokemon8gToTable);
  const pokemonEntries8g: PokemonDatabase[] = (
    await readJSON(POKEMON_8G_FILE)
  ).map(mapPokemon8gToTable);

  pokemonEntries.push(...pokemonEntries7g, ...pokemonEntries8g);

  await knex<PokemonDatabase>("pokemon").del().insert(pokemonEntries);
};
