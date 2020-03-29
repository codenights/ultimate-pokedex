import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities } from "../utils/dataloader";
import { Evolution } from "../../db/types";

export function EvolutionRepository(knex: Knex) {
  return {
    findEvolutionsByPokemonId: new DataLoader<number, Evolution[]>(
      pokemonIds => (
        console.log("findEvolutionsByPokemonId:", pokemonIds),
        knex("evolution")
          .whereIn("evolves_from_id", pokemonIds)
          .then(mapManytoEntities<Evolution>(pokemonIds, "evolves_from_id"))
      )
    ),
  };
}
