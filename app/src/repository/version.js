import DataLoader from "dataloader";
import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";

export function VersionRepository(knex) {
  return {
    findVersionById: new DataLoader(
      versionIds =>
        console.log("findVersionById:", versionIds) ||
        knex("version")
          .whereIn("id", versionIds)
          .then(mapRowsToEntities(versionIds, "id"))
    ),
    findVersionsByVersionGroupId: new DataLoader(
      versionGroupIds =>
        console.log("findVersionsByVersionGroupId:", versionGroupIds) ||
        knex("version")
          .whereIn("version_group_id", versionGroupIds)
          .then(mapManytoEntities(versionGroupIds, "version_group_id"))
    ),
  };
}
