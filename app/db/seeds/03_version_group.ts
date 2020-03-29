import path from "path";
import * as Knex from "knex";

import { VersionGroup } from "../../db/types";
import { VersionGroup as VersionGroupSource } from "./types/VersionGroup";
import { getDirectoryContent } from "./utils";

const DIR = path.join(__dirname, "../../../data/version-group");

function mapToTable(versionGroup: VersionGroupSource): VersionGroup {
  return {
    id: versionGroup.id,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing version groups...");

  const versionGroups = (
    await getDirectoryContent<VersionGroupSource>(DIR)
  ).map(mapToTable);

  await knex<VersionGroup>("version_group").del().insert(versionGroups);
};
