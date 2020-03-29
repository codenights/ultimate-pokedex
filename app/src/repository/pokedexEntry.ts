import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities } from "../utils/dataloader";
import { PokedexEntry } from "../../db/types";

export function PokedexEntryRepository(knex: Knex) {
  return {
    findPokedexEntriesByPokemonId: new DataLoader<number, PokedexEntry[]>(
      pokemonIds => (
        console.log("findPokedexEntriesByPokemonId:", pokemonIds),
        knex("pokedex_entry")
          .whereIn("pokemon_id", pokemonIds)
          .then(mapManytoEntities<PokedexEntry>(pokemonIds, "pokemon_id"))
      )
    ),
  };
}
