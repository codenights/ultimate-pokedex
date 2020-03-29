import path from "path";
import * as Knex from "knex";

import { Move } from "../../db/types";
import { Move as MoveSource } from "./types/Move";
import {
  getDirectoryContent,
  findEntityByLanguageName,
  extractIdFromUrl,
} from "./utils";

const DIR = path.join(__dirname, "../../../data/move");

function mapToTable(move: MoveSource): Move {
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

  const moves = (await getDirectoryContent<MoveSource>(DIR)).map(mapToTable);

  await knex<Move>("move").del().insert(moves);
};
