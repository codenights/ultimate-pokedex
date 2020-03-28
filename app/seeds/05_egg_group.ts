import * as Knex from "knex";
import { EggGroup } from "./types/EggGroup";

const path = require("path");
const { getDirectoryContent, findEntityByLanguageName } = require("./utils");

const DIR = path.join(__dirname, "../../data/egg-group");

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

  const eggGroups: EggGroupDatabase[] = (await getDirectoryContent(DIR)).map(
    mapToTable
  );

  await knex("egg_group").del().insert(eggGroups);
};
