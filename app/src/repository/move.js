export function MoveRepository(knex) {
  return {
    findMoveById(moveId) {
      return knex("move")
        .first()
        .where({ id: moveId });
    },
    findMovesByPokemonId(pokemonId) {
      return knex("move")
        .distinct("move.id")
        .innerJoin("pokemon_move", "move.id", "pokemon_move.move_id")
        .select("move.*")
        .where({ pokemon_id: pokemonId });
    }
  };
}
