import DataLoader from "dataloader";
import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";

export function EggGroupRepository(knex) {
  return {
    findEggGroupById: new DataLoader(
      eggGroupIds =>
        console.log("findEggGroupById:", eggGroupIds) ||
        knex("egg_group")
          .whereIn("id", eggGroupIds)
          .then(mapRowsToEntities(eggGroupIds, "id"))
    ),
    findEggGroupByPokemonId: new DataLoader(
      pokemonIds =>
        console.log("findEggGroupByPokemonId:", pokemonIds) ||
        knex("egg_group")
          .innerJoin(
            "pokemon_egg_group",
            "egg_group.id",
            "pokemon_egg_group.egg_group_id"
          )
          .select("egg_group.*", "pokemon_id")
          .whereIn("pokemon_id", pokemonIds)
          .orderBy("name", "asc")
          .then(mapManytoEntities(pokemonIds, "pokemon_id"))
    ),
  };
}
