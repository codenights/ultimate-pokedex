import DataLoader from "dataloader";
import { mapManytoEntities } from "../utils/dataloader";

export function EvolutionRepository(knex) {
  return {
    findEvolutionsByPokemonId: new DataLoader(
      pokemonIds =>
        console.log("findEvolutionsByPokemonId:", pokemonIds) ||
        knex("evolution")
          .whereIn("evolves_from_id", pokemonIds)
          .then(mapManytoEntities(pokemonIds, "evolves_from_id"))
    )
  };
}
