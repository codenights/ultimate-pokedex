import DataLoader from "dataloader";
import { mapRowsToEntities } from "../utils/dataloader";

export function ShapeRepository(knex) {
  return {
    findShapeById: new DataLoader(
      shapeIds =>
        console.log("findShapeById:", shapeIds) ||
        knex("shape")
          .whereIn("id", shapeIds)
          .then(mapRowsToEntities(shapeIds, "id"))
    ),
  };
}
