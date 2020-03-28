import * as Knex from "knex";
import { Ability, Ability8G } from "./types/Ability";

const path = require("path");
const { readJSON } = require("fs-extra");
const { getDirectoryContent, findEntityByLanguageName } = require("./utils");

const ABILITY_DIR = path.join(__dirname, "../../data/ability");
const ABILITIY_8G_FILE = path.join(
  __dirname,
  "../../data/pokemon-next",
  "abilities-8-gen.json"
);

type AbilityDatabase = {
  id: number;
  name_en: string;
  name_fr: string;
  name_ja: string;
  description: string;
};

function mapToTable(ability: Ability): AbilityDatabase {
  return {
    id: ability.id,
    name_en: findEntityByLanguageName(ability.names, "en").name,
    name_fr: findEntityByLanguageName(ability.names, "fr")
      ? findEntityByLanguageName(ability.names, "fr").name
      : null,
    name_ja: findEntityByLanguageName(ability.names, "roomaji")
      ? findEntityByLanguageName(ability.names, "roomaji").name
      : null,
    description: findEntityByLanguageName(ability.effect_entries, "en").effect,
  };
}

function map8gAbilitiesToTable(ability: Ability8G): AbilityDatabase {
  return {
    id: ability.id,
    name_en: ability.name,
    name_fr: null,
    name_ja: null,
    description: ability.description,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing abilities...");

  const abilities: AbilityDatabase[] = (
    await getDirectoryContent(ABILITY_DIR)
  ).map(mapToTable);
  const abilities8g = (await readJSON(ABILITIY_8G_FILE)).map(
    map8gAbilitiesToTable
  );

  await knex("ability")
    .del()
    .insert([...abilities, ...abilities8g]);
};
