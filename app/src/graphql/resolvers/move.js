import * as R from "ramda";

export const MoveResolver = {
  type: ({ type_id }, args, { typeRepository }) =>
    typeRepository.findTypeById(type_id),
  damageClass: R.prop("damage_class"),

  pokemons: ({ id }, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByMoveId(id)
};
