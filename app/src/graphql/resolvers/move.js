import * as R from "ramda";

export const MoveResolver = {
  damageClass: R.prop("damage_class"),
  criticalRate: R.prop("critical_rate"),
  drain: R.prop("drain"),
  healing: R.prop("healing"),
  flinchChance: R.prop("flinch_chance"),

  type: ({ type_id }, args, { typeRepository }) =>
    typeRepository.findTypeById(type_id),

  pokemons: ({ id }, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByMoveId(id)
};
