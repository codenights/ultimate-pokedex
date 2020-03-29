import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";
import { Move } from "../../db/types";

export function MoveRepository(knex: Knex) {
  return {
    findMoveById: new DataLoader<number, Move>(
      moveIds => (
        console.log("findMoveById:", moveIds),
        knex("move")
          .whereIn("id", moveIds)
          .then(mapRowsToEntities<Move>(moveIds, "id"))
      )
    ),
    findMovesByPokemonId: new DataLoader<number, Move[]>(
      pokemonIds => (
        console.log("findMovesByPokemonId:", pokemonIds),
        knex("move")
          .distinct("move.id")
          .innerJoin("pokemon_move", "move.id", "pokemon_move.move_id")
          .select("move.*", "pokemon_id")
          .whereIn("pokemon_id", pokemonIds)
          .orderBy("name", "asc")
          .then(mapManytoEntities<Move>(pokemonIds, "pokemon_id"))
      )
    ),
  };
}
