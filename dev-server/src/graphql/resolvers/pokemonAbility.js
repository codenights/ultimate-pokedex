const R = require("ramda");

module.exports.PokemonAbilityResolver = {
  isHidden: R.prop("is_hidden"),
  ability: ({ ability_id }, args, { abilityRepository }) =>
    abilityRepository.findAbilityById(ability_id)
};
