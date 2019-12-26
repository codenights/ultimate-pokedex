module.exports.AbilityPokemonResolver = {
  isHidden: abilityPokemon => abilityPokemon.is_hidden,
  pokemon: (abilityPokemon, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonById(abilityPokemon.pokemon_id)
};
