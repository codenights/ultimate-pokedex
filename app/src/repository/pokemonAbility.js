import DataLoader from "dataloader";
import { mapManytoEntities } from "../utils/dataloader";

export function PokemonAbilityRepository(knex) {
  return {
    findByAbilityId: new DataLoader(
      abilityIds =>
        console.log("findByAbilityId:", abilityIds) ||
        knex("pokemon_ability")
          .whereIn("ability_id", abilityIds)
          .then(mapManytoEntities(abilityIds, "ability_id"))
    ),
    findByPokemonId: new DataLoader(
      pokemonIds =>
        console.log("findByPokemonId:", pokemonIds) ||
        knex("pokemon_ability")
          .whereIn("pokemon_id", pokemonIds)
          .then(mapManytoEntities(pokemonIds, "pokemon_id"))
    )
  };
}
