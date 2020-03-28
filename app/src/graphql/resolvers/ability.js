import * as R from "ramda";

export const AbilityResolver = {
  name: R.prop("name_en"),
  pokemons: (ability, args, { pokemonAbilityRepository }) =>
    pokemonAbilityRepository.findByAbilityId.load(ability.id),
};
