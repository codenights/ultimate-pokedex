import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapRowsToEntities } from "../utils/dataloader";
import { Type } from "../../db/types";

export function TypeRepository(knex: Knex) {
  return {
    findTypeById: new DataLoader<number, Type>(
      typeIds => (
        console.log("findTypeById:", typeIds),
        knex("type")
          .whereIn("id", typeIds)
          .then(mapRowsToEntities<Type>(typeIds, "id"))
      )
    ),
  };
}
