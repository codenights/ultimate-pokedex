import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities } from "../utils/dataloader";
import { PokemonAbility } from "../../db/types";

export function PokemonAbilityRepository(knex: Knex) {
  return {
    findByAbilityId: new DataLoader<number, PokemonAbility[]>(
      abilityIds => (
        console.log("findByAbilityId:", abilityIds),
        knex("pokemon_ability")
          .whereIn("ability_id", abilityIds)
          .then(mapManytoEntities<PokemonAbility>(abilityIds, "ability_id"))
      )
    ),
    findByPokemonId: new DataLoader<number, PokemonAbility[]>(
      pokemonIds => (
        console.log("findByPokemonId:", pokemonIds),
        knex("pokemon_ability")
          .whereIn("pokemon_id", pokemonIds)
          .orderBy("is_hidden", "asc")
          .then(mapManytoEntities<PokemonAbility>(pokemonIds, "pokemon_id"))
      )
    ),
  };
}
