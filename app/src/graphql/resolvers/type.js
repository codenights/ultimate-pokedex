import * as R from "ramda";

export const TypeResolver = {
  name: R.prop("name_en"),

  damagesFrom: ({ id }, args, { damageRepository }) =>
    damageRepository.findDamagesByTypeIds(id, null),

  pokemons: ({ id }, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByTypeId(id),
};
