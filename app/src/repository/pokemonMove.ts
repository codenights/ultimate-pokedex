import * as Knex from "knex";
import DataLoader from "dataloader";

import { PokemonMove } from "../../db/types";

type PokemonMoveKeys = {
  pokemonId: number;
  moveId: number;
};

export function PokemonMoveRepository(knex: Knex) {
  return {
    findPokemonMoveByPokemonIdAndMoveId: new DataLoader<
      PokemonMoveKeys,
      PokemonMove[]
    >(
      ids => {
        console.log("findPokemonMoveByPokemonIdAndMoveId:", ids);
        let query = knex<PokemonMove>("pokemon_move");

        for (const { pokemonId, moveId } of ids) {
          query.orWhere({
            pokemon_id: pokemonId,
            move_id: moveId,
          });
        }

        return query.then(rows =>
          ids.map(({ pokemonId, moveId }) =>
            rows.filter(
              row =>
                row.move_id.toString() === moveId.toString() &&
                row.pokemon_id.toString() === pokemonId.toString()
            )
          )
        );
      },
      {
        cacheKeyFn: ids => `${ids.pokemonId}_${ids.moveId}` as any,
      }
    ),
  };
}
