const {
  extractNationalIdFromSpeciesUrl,
  extractTypeIdFromTypeUrl
} = require("../../utils");
const { findTypeById } = require("../../repository/type");
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
  names: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);
    const enLanguage = species.names.find(x => x.language.name === "en");
    const frLanguage = species.names.find(x => x.language.name === "fr");
    const jaLanguage = species.names.find(x => x.language.name === "roomaji");

    return {
      en: enLanguage ? enLanguage.name : null,
      fr: frLanguage ? frLanguage.name : null,
      ja: jaLanguage ? jaLanguage.name : null
    };
  },
  types: pokemon =>
    pokemon.types.map(x => {
      const typeId = extractTypeIdFromTypeUrl(x.type.url);

      return findTypeById(typeId);
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
  },
  spriteUrl: pokemon => pokemon.sprites.front_default,
  artworkUrl: pokemon => {
    if (pokemon.id > 807) {
      return pokemon.sprites.front_default;
    }

    const spriteId = pokemon.id.toString().padStart(3, "0");

    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`;
  }
};
