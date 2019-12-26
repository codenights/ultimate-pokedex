module.exports.PokemonMoveRepository = function(knex) {
  return {
    findPokemonMoveByPokemonIdAndMoveId(pokemonId, moveId) {
      return knex("pokemon_move").where({
        pokemon_id: pokemonId,
        move_id: moveId
      });
    }
  };
};
