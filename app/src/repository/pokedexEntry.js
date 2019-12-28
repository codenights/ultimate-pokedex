import DataLoader from "dataloader";
import { mapManytoEntities } from "../utils/dataloader";

export function PokedexEntryRepository(knex) {
  return {
    findPokedexEntriesByPokemonId: new DataLoader(
      pokemonIds =>
        console.log("findPokedexEntriesByPokemonId:", pokemonIds) ||
        knex("pokedex_entry")
          .whereIn("pokemon_id", pokemonIds)
          .then(mapManytoEntities(pokemonIds, "pokemon_id"))
    )
  };
}
