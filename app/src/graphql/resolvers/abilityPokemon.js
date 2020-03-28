export const AbilityPokemonResolver = {
  isHidden: abilityPokemon => abilityPokemon.is_hidden,
  pokemon: (abilityPokemon, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonById.load(abilityPokemon.pokemon_id),
};
