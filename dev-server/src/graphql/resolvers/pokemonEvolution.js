module.exports.PokemonEvolutionResolver = {
  pokemon: ({ evolves_to_id }, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonById(evolves_to_id)
};
