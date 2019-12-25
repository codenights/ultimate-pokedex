const { findPokemonById } = require("../../repository/pokemon");
const { extractNationalIdFromSpeciesUrl } = require("../../utils");

module.exports.EggGroupResolver = {
  name: eggGroup => eggGroup.names.find(x => x.language.name === "en").name,
  pokemons: async eggGroup =>
    eggGroup.pokemon_species
      .map(x => x.url)
      .map(extractNationalIdFromSpeciesUrl)
      .map(findPokemonById)
};
