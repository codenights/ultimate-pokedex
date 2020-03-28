import DataLoader from "dataloader";

export function PokemonMoveRepository(knex) {
  return {
    findPokemonMoveByPokemonIdAndMoveId: new DataLoader(
      ids => {
        console.log("findPokemonMoveByPokemonIdAndMoveId:", ids);
        let query = knex("pokemon_move");

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
        cacheKeyFn: ids => `${ids.pokemonId}_${ids.moveId}`,
      }
    ),
  };
}
