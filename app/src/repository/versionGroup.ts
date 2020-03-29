import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapRowsToEntities } from "../utils/dataloader";
import { VersionGroup } from "../../db/types";

export function VersionGroupRepository(knex: Knex) {
  return {
    findVersionGroupById: new DataLoader<number, VersionGroup>(
      versionGroupIds => (
        console.log("findVersionGroupById:", versionGroupIds),
        knex("version_group")
          .whereIn("id", versionGroupIds)
          .then(mapRowsToEntities<VersionGroup>(versionGroupIds, "id"))
      )
    ),
  };
}
