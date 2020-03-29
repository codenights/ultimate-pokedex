import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapRowsToEntities } from "../utils/dataloader";
import { Shape } from "../../db/types";

export function ShapeRepository(knex: Knex) {
  return {
    findShapeById: new DataLoader<number, Shape>(
      shapeIds => (
        console.log("findShapeById:", shapeIds),
        knex("shape")
          .whereIn("id", shapeIds)
          .then(mapRowsToEntities<Shape>(shapeIds, "id"))
      )
    ),
  };
}
