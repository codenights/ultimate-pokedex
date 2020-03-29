import DataLoader from "dataloader";
import * as Knex from "knex";

import { Color } from "../../db/types";
import { mapRowsToEntities } from "../utils/dataloader";

export function ColorRepository(knex: Knex) {
  return {
    findColorById: new DataLoader<number, Color>(
      colorIds => (
        console.log("findColorById:", colorIds),
        knex("color")
          .whereIn("id", colorIds)
          .then(mapRowsToEntities<Color>(colorIds, "id"))
      )
    ),
  };
}
