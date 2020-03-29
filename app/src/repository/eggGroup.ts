import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";
import { EggGroup } from "../../db/types";

export function EggGroupRepository(knex: Knex) {
  return {
    findEggGroupById: new DataLoader<number, EggGroup>(
      eggGroupIds => (
        console.log("findEggGroupById:", eggGroupIds),
        knex("egg_group")
          .whereIn("id", eggGroupIds)
          .then(mapRowsToEntities<EggGroup>(eggGroupIds, "id"))
      )
    ),
    findEggGroupByPokemonId: new DataLoader<number, EggGroup[]>(
      pokemonIds => (
        console.log("findEggGroupByPokemonId:", pokemonIds),
        knex("egg_group")
          .innerJoin(
            "pokemon_egg_group",
            "egg_group.id",
            "pokemon_egg_group.egg_group_id"
          )
          .select("egg_group.*", "pokemon_id")
          .whereIn("pokemon_id", pokemonIds)
          .orderBy("name", "asc")
          .then(mapManytoEntities<EggGroup>(pokemonIds, "pokemon_id"))
      )
    ),
  };
}
