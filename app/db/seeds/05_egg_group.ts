import path from "path";
import * as Knex from "knex";

import { EggGroup } from "./types/EggGroup";
import { getDirectoryContent, findEntityByLanguageName } from "./utils";

const DIR = path.join(__dirname, "../../../data/egg-group");

type EggGroupDatabase = {
  id: number;
  name: string;
};

function mapToTable(eggGroup: EggGroup): EggGroupDatabase {
  return {
    id: eggGroup.id,
    name: findEntityByLanguageName(eggGroup.names, "en").name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing egg groups...");

  const eggGroups = (await getDirectoryContent<EggGroup>(DIR)).map(mapToTable);

  await knex<EggGroupDatabase>("egg_group").del().insert(eggGroups);
};
