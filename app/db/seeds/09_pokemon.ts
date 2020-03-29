import path from "path";
import { readJSON, pathExists } from "fs-extra";
import * as Knex from "knex";

import { Pokemon } from "../../db/types";
import {
  Pokemon as PokemonSource,
  Pokemon8G as Pokemon8GSource,
} from "./types/Pokemon";
import { PokemonSpecies, Variety } from "./types/PokemonSpecies";
import { Color } from "./types/Color";
import { Shape } from "./types/Shape";
import { Classification } from "./types/Classification";
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
const POKEMON_UNTIL_7G_FILE = path.join(
  __dirname,
  "../../../data/pokemon-next/all-gens.json"
);
const COLOR_FILE = path.join(__dirname, "../../../data/color/colors.json");
const SHAPE_FILE = path.join(__dirname, "../../../data/shape/shapes.json");
const CLASSIFICATION_FILE = path.join(
  __dirname,
  "../../../data/classification/classifications.json"
);

const findStatByName = (pokemon: PokemonSource, statName: string) =>
  pokemon.stats.find(x => x.stat.name === statName).base_stat;

const findTypeId = (slot: number) => (pokemon: PokemonSource) =>
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

async function getPokemonNames(
  species: PokemonSpecies,
  pokemon: PokemonSource
): Promise<Pick<Pokemon, "name_en" | "name_fr" | "name_ja">> {
  const names = {
    name_en: findEntityByLanguageName(species.names, "en").name,
    name_fr: findEntityByLanguageName(species.names, "fr")
      ? findEntityByLanguageName(species.names, "fr").name
      : null,
    name_ja: findEntityByLanguageName(species.names, "ja")
      ? findEntityByLanguageName(species.names, "ja").name
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
    const rawSuffixJa = findEntityByLanguageName(form.form_names, "ja")
      ? findEntityByLanguageName(form.form_names, "ja").name
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

async function getArtworkUrl(species: PokemonSpecies, pokemon: PokemonSource) {
  const pokemonArtworkUrl = `/artwork/${pokemon.id}.png`;
  const speciesArtworkUrl = `/artwork/${species.id}.png`;
  const pokemonArtworkPath = path.join(PUBLIC_DIR, pokemonArtworkUrl);

  return (await pathExists(pokemonArtworkPath))
    ? pokemonArtworkUrl
    : speciesArtworkUrl;
}

async function mapToTable(
  species: PokemonSpecies,
  pokemon: PokemonSource,
  colorId: number,
  shapeId: number,
  classification: string
): Promise<Pokemon> {
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
    classification: classification,
    color_id: colorId,
    shape_id: shapeId,
    type_1_id: findType1Id(pokemon),
    type_2_id: findType2Id(pokemon),
    artwork_url: await getArtworkUrl(species, pokemon),
    sprite_url: `/sprite/${species.id}.png`,
    shiny_sprite_url: `/sprite-shiny/${species.id}.png`,
  };
}

function mapPokemon8gToTable(
  pokemon: Pokemon8GSource,
  colorId: number,
  shapeId: number,
  classification: string
): Pokemon {
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
    classification: classification,
    color_id: colorId,
    shape_id: shapeId,
    type_1_id: pokemon.types[0].id,
    type_2_id: pokemon.types[1] ? pokemon.types[1].id : null,
    artwork_url: `/artwork/${pokemon.id}.png`,
    sprite_url: `/sprite/${pokemon.id}.png`,
    shiny_sprite_url: `/sprite-shiny/${pokemon.id}.png`,
  };
}

type PokemonExtraInfo = {
  id: number;
  color: string;
  shape: string;
};

exports.seed = async (knex: Knex) => {
  console.log("Importing Pokemon...");

  const pokemonEntries: Pokemon[] = [];
  const allSpecies = await getDirectoryContent<PokemonSpecies>(SPECIES_DIR);
  const pokemonsExtraInfo: PokemonExtraInfo[] = await readJSON(
    POKEMON_UNTIL_7G_FILE
  );
  const colors: Color[] = await readJSON(COLOR_FILE);
  const shapes: Shape[] = await readJSON(SHAPE_FILE);
  const classifications: Classification[] = await readJSON(CLASSIFICATION_FILE);

  for (const species of allSpecies) {
    const pokemons = await Promise.all<PokemonSource>(
      species.varieties.map(findPokemonByVariety)
    );

    for (const pokemon of pokemons) {
      const pokemonExtraInfo = pokemonsExtraInfo.find(x => x.id === species.id);
      const pokemonEntry = await mapToTable(
        species,
        pokemon,
        colors.find(color => color.name === pokemonExtraInfo.color).id,
        shapes.find(shape => shape.name === pokemonExtraInfo.shape).id,
        classifications.find(classification => classification.id === species.id)
          .name
      );
      pokemonEntries.push(pokemonEntry);
    }
  }

  const pokemonEntries7gAnd8g: Pokemon[] = [
    ...(await readJSON(POKEMON_7G_FILE)),
    ...(await readJSON(POKEMON_8G_FILE)),
  ].map((pokemon: Pokemon8GSource) =>
    mapPokemon8gToTable(
      pokemon,
      colors.find(color => color.name === pokemon.color).id,
      shapes.find(shape => shape.name === pokemon.shape).id,
      classifications.find(classification => classification.id === pokemon.id)
        .name
    )
  );

  pokemonEntries.push(...pokemonEntries7gAnd8g);

  await knex<Pokemon>("pokemon").del().insert(pokemonEntries);
};
