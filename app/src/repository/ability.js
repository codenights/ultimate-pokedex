import DataLoader from "dataloader";
import { mapRowsToEntities } from "../utils/dataloader";

export function AbilityRepository(knex) {
  return {
    findAllAbilities() {
      return knex("ability").select();
    },
    findAbilityById: new DataLoader(
      abilityIds =>
        console.log("findAbilityById:", abilityIds) ||
        knex("ability")
          .whereIn("id", abilityIds)
          .then(mapRowsToEntities(abilityIds, "id"))
    )
  };
}
