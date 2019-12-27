import * as R from "ramda";

export const PokemonMoveResolver = {
  move: R.identity,
  learn: ({ id, pokemon_id }, args, { pokemonMoveRepository }) =>
    pokemonMoveRepository.findPokemonMoveByPokemonIdAndMoveId(pokemon_id, id)
};
