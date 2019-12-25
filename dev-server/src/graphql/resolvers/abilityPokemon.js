const { extractPokemonIdFromPokemonUrl } = require("../../utils");
const { findPokemonById } = require("../../repository/pokemon");

module.exports.AbilityPokemonResolver = {
  isHidden: abilityPokemon => abilityPokemon.is_hidden,
  pokemon: abilityPokemon => {
    const pokemonId = extractPokemonIdFromPokemonUrl(
      abilityPokemon.pokemon.url
    );

    return findPokemonById(pokemonId);
  }
};
