import DataLoader from "dataloader";
import { mapRowsToEntities } from "../utils/dataloader";

export function VersionGroupRepository(knex) {
  return {
    findVersionGroupById: new DataLoader(
      versionGroupIds =>
        console.log("findVersionGroupById:", versionGroupIds) ||
        knex("version_group")
          .whereIn("id", versionGroupIds)
          .then(mapRowsToEntities(versionGroupIds, "id"))
    ),
  };
}
