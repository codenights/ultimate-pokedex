const R = require("ramda");

module.exports.AbilityResolver = {
  name: R.prop("name_en"),
  pokemons: (ability, args, { pokemonAbilityRepository }) =>
    pokemonAbilityRepository.findByAbilityId(ability.id)
};
