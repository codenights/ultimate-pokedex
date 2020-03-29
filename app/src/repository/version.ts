import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";
import { Version } from "../../db/types";

export function VersionRepository(knex: Knex) {
  return {
    findVersionById: new DataLoader<number, Version>(
      versionIds => (
        console.log("findVersionById:", versionIds),
        knex("version")
          .whereIn("id", versionIds)
          .then(mapRowsToEntities<Version>(versionIds, "id"))
      )
    ),
    findVersionsByVersionGroupId: new DataLoader<number, Version[]>(
      versionGroupIds => (
        console.log("findVersionsByVersionGroupId:", versionGroupIds),
        knex("version")
          .whereIn("version_group_id", versionGroupIds)
          .then(mapManytoEntities<Version>(versionGroupIds, "version_group_id"))
      )
    ),
  };
}
