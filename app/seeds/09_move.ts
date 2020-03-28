import * as Knex from "knex";
import { Move } from "./types/Move";

const path = require("path");
const {
  getDirectoryContent,
  findEntityByLanguageName,
  extractIdFromUrl,
} = require("./utils");

const DIR = path.join(__dirname, "../../data/move");

type MoveDatabase = {
  id: number;
  name: string;
  description: string;
  type_id: number;
  damage_class: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  priority: number;
  critical_rate: number;
  drain: number | null;
  flinch_chance: number;
  healing: number | null;
};

function mapToTable(move: Move): MoveDatabase {
  return {
    id: move.id,
    name: findEntityByLanguageName(move.names, "en").name,
    description: findEntityByLanguageName(
      move.effect_entries,
      "en"
    ).effect.replace("$effect_chance", move.effect_chance),
    type_id: extractIdFromUrl("type", move.type.url),
    damage_class: move.damage_class.name,
    accuracy: move.accuracy,
    power: move.power,
    pp: move.pp,
    priority: move.priority,
    critical_rate: move.meta.crit_rate,
    drain: move.meta.drain || null,
    flinch_chance: move.meta.flinch_chance,
    healing: move.meta.healing || null,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing moves...");

  const moves: MoveDatabase[] = (await getDirectoryContent(DIR)).map(
    mapToTable
  );

  await knex("move").del().insert(moves);
};
