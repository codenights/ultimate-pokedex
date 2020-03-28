export const PokemonEvolutionResolver = {
  pokemon: ({ evolves_to_id }, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonById.load(evolves_to_id),
};
