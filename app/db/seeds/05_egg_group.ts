import path from "path";
import * as Knex from "knex";

import { EggGroup } from "../../db/types";
import { EggGroup as EggGroupSource } from "./types/EggGroup";
import { getDirectoryContent, findEntityByLanguageName } from "./utils";

const DIR = path.join(__dirname, "../../../data/egg-group");

function mapToTable(eggGroup: EggGroupSource): EggGroup {
  return {
    id: eggGroup.id,
    name: findEntityByLanguageName(eggGroup.names, "en").name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing egg groups...");

  const eggGroups = (await getDirectoryContent<EggGroupSource>(DIR)).map(
    mapToTable
  );

  await knex<EggGroup>("egg_group").del().insert(eggGroups);
};
