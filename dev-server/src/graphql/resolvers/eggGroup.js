module.exports.EggGroupResolver = {
  pokemons: (eggGroup, args, { pokemonRepository }) =>
    pokemonRepository.findPokemonsByEggGroupId(eggGroup.id)
};
