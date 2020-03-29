import DataLoader from "dataloader";
import * as Knex from "knex";

import { Ability } from "../../db/types";
import { mapRowsToEntities } from "../utils/dataloader";

export function AbilityRepository(knex: Knex) {
  return {
    findAllAbilities() {
      return knex("ability").select().orderBy("name_en");
    },
    findAbilityById: new DataLoader<number, Ability>(
      abilityIds => (
        console.log("findAbilityById:", abilityIds),
        knex("ability")
          .whereIn("id", abilityIds)
          .then(mapRowsToEntities<Ability>(abilityIds, "id"))
      )
    ),
  };
}
