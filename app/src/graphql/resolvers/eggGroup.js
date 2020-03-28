export const EggGroupResolver = {
  pokemons: (eggGroup, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByEggGroupId.load(eggGroup.id),
};
