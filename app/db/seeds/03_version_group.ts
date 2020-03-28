import path from "path";
import * as Knex from "knex";

import { VersionGroup } from "./types/VersionGroup";
import { getDirectoryContent } from "./utils";

const DIR = path.join(__dirname, "../../../data/version-group");

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

  const versionGroups = (await getDirectoryContent<VersionGroup>(DIR)).map(
    mapToTable
  );

  await knex<VersionGroupDatabase>("version_group").del().insert(versionGroups);
};
