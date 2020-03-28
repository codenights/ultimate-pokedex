import * as Knex from "knex";
import { VersionGroup } from "./types/VersionGroup";

const path = require("path");
const { getDirectoryContent } = require("./utils");

const DIR = path.join(__dirname, "../../data/version-group");

type VersionGroupDatabase = {
  id: number;
};

function mapToTable(versionGroup: VersionGroup): VersionGroupDatabase {
  return {
    id: versionGroup.id,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing version groups...");

  const versionGroups: VersionGroupDatabase[] = (
    await getDirectoryContent(DIR)
  ).map(mapToTable);

  await knex("version_group").del().insert(versionGroups);
};
