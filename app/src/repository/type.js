import DataLoader from "dataloader";
import { mapRowsToEntities } from "../utils/dataloader";

export function TypeRepository(knex) {
  return {
    findTypeById: new DataLoader(
      typeIds =>
        console.log("findTypeById:", typeIds) ||
        knex("type")
          .whereIn("id", typeIds)
          .then(mapRowsToEntities(typeIds, "id"))
    ),
  };
}
