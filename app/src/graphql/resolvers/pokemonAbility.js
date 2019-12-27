import * as R from "ramda";

export const PokemonAbilityResolver = {
  isHidden: R.prop("is_hidden"),
  ability: ({ ability_id }, args, { abilityRepository }) =>
    abilityRepository.findAbilityById(ability_id)
};
