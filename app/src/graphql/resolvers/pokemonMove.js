import * as R from "ramda";

export const PokemonMoveResolver = {
  move: R.identity,
  learn: ({ id, pokemon_id }, args, { pokemonMoveRepository }) =>
    pokemonMoveRepository.findPokemonMoveByPokemonIdAndMoveId.load({
      pokemonId: pokemon_id,
      moveId: id
    })
};
