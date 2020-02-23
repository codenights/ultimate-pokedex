import * as R from "ramda";

export const TypeResolver = {
  name: R.prop("name_en"),

  damagesFrom: ({ id }, args, { damageRepository }) =>
    damageRepository.findDamagesFromByTypeIds(id, null),

  damagesTo: ({ id }, args, { damageRepository }) =>
    damageRepository.findDamagesToByTypeIds(id, null),

  pokemons: ({ id }, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByTypeId(id),
};
