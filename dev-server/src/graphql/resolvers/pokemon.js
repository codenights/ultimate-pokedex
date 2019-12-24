const path = require("path");
const { readJSON } = require("fs-extra");

const {
  extractNationalIdFromSpeciesUrl,
  extractTypeIdFromTypeUrl
} = require("../../utils");
const { DB_DIR } = require("../../repository/config");
const {
  findPokemonSpeciesByPokemonId
} = require("../../repository/pokemonSpecies");
const { findPokemonById } = require("../../repository/pokemon");
const {
  findEvolutionChainByPokemonId
} = require("../../repository/evolutionChain");

const findEvolutions = (pokemon, root) => {
  if (root.species.name === pokemon.name) {
    return root.evolves_to;
  } else {
    for (const node of root.evolves_to) {
      const evolutions = findEvolutions(pokemon, node);

      if (evolutions.length > 0) {
        return evolutions;
      }
    }

    return [];
  }
};

module.exports.PokemonResolver = {
  types: pokemon =>
    pokemon.types.map(x => {
      const typeId = extractTypeIdFromTypeUrl(x.type.url);

      return readJSON(path.join(DB_DIR, `type/${typeId}.json`));
    }),
  evolutions: async pokemon => {
    const evolutionChain = await findEvolutionChainByPokemonId(pokemon.id);
    const evolutions = findEvolutions(pokemon, evolutionChain.chain);

    return Promise.all(
      evolutions.map(evolution => {
        const nationalId = extractNationalIdFromSpeciesUrl(
          evolution.species.url
        );

        return { pokemon: findPokemonById(nationalId) };
      })
    );
  },
  family: async pokemon => {
    const evolutionChain = await findEvolutionChainByPokemonId(pokemon.id);
    const nationalId = extractNationalIdFromSpeciesUrl(
      evolutionChain.chain.species.url
    );

    const result = await findPokemonById(nationalId);

    return { pokemon: result };
  },
  pokedexEntries: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);
    return species.flavor_text_entries.filter(x => x.language.name === "en");
  }
};
