const { findAbilityById } = require("../../repository/ability");
const { extractAbilityIdFromUrl } = require("../../utils");

module.exports.PokemonAbilityResolver = {
  isHidden: pokemonAbility => pokemonAbility.is_hidden,
  ability: pokemonAbility => {
    const abilityId = extractAbilityIdFromUrl(pokemonAbility.ability.url);

    return findAbilityById(abilityId);
  }
};
