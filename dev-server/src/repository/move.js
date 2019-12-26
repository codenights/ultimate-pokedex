module.exports.MoveRepository = function(knex) {
  return {
    findMovesByPokemonId(pokemonId) {
      return knex("move")
        .distinct("move.id")
        .innerJoin("pokemon_move", "move.id", "pokemon_move.move_id")
        .select("move.*")
        .where({ pokemon_id: pokemonId });
    }
  };
};
