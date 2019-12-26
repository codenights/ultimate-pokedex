const R = require("ramda");

module.exports.PokemonMoveResolver = {
  move: R.identity,
  learn: ({ id, pokemon_id }, args, { pokemonMoveRepository }) =>
    pokemonMoveRepository.findPokemonMoveByPokemonIdAndMoveId(pokemon_id, id)
};
