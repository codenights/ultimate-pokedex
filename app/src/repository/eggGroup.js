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
            "egg_group_pokemon",
            "egg_group.id",
            "egg_group_pokemon.egg_group_id"
          )
          .select("egg_group.*", "pokemon_id")
          .whereIn("pokemon_id", pokemonIds)
          .then(mapManytoEntities(pokemonIds, "pokemon_id"))
    )
  };
}
