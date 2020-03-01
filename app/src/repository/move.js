import DataLoader from "dataloader";
import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";

export function MoveRepository(knex) {
  return {
    findMoveById: new DataLoader(
      moveIds =>
        console.log("findMoveById:", moveIds) ||
        knex("move")
          .whereIn("id", moveIds)
          .then(mapRowsToEntities(moveIds, "id"))
    ),
    findMovesByPokemonId: new DataLoader(
      pokemonIds =>
        console.log("findMovesByPokemonId:", pokemonIds) ||
        knex("move")
          .distinct("move.id")
          .innerJoin("pokemon_move", "move.id", "pokemon_move.move_id")
          .select("move.*", "pokemon_id")
          .whereIn("pokemon_id", pokemonIds)
          .orderBy("name", "asc")
          .then(mapManytoEntities(pokemonIds, "pokemon_id"))
    ),
  };
}
