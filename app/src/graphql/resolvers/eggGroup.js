export const EggGroupResolver = {
  pokemons: (eggGroup, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByEggGroupId(eggGroup.id)
};
