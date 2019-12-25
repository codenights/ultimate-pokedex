const { findPokemonFormByPokemonId } = require("../../repository/pokemonForm");
const { extractPokemonIdFromPokemonUrl } = require("../../utils");
const {
  extractNationalIdFromSpeciesUrl,
  extractTypeIdFromTypeUrl,
  extractEggGroupIdFromEggGroupUrl
} = require("../../utils");
const { findEggGroupById } = require("../../repository/eggGroup");
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

const DEFAULT_SPRITE_URL = "https://www.svgrepo.com/show/54691/pokemon.svg";

const findByLanguage = language => x => x.language.name === language;
const makeSuffix = suffix => ` (${suffix})`;
const appendSuffix = (name, suffix) => `${name}${suffix || ""}`;

module.exports.PokemonResolver = {
  names: async pokemon => {
    // For alternate form, we need to get the name using the pokemon-form
    const form = await findPokemonFormByPokemonId(pokemon.id);
    const formSuffix = {};

    if (form.form_names.length > 0) {
      const enLanguage = form.form_names.find(findByLanguage("en"));
      const frLanguage = form.form_names.find(findByLanguage("fr"));
      const jaLanguage = form.form_names.find(findByLanguage("roomaji"));

      formSuffix.en = enLanguage ? makeSuffix(enLanguage.name) : "";
      formSuffix.fr = frLanguage ? makeSuffix(frLanguage.name) : "";
      formSuffix.ja = jaLanguage ? makeSuffix(jaLanguage.name) : "";
    }

    // For other forms, we can use the pokemon-species
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);
    const enLanguage = species.names.find(findByLanguage("en"));
    const frLanguage = species.names.find(findByLanguage("fr"));
    const jaLanguage = species.names.find(findByLanguage("roomaji"));

    return {
      en: enLanguage ? appendSuffix(enLanguage.name, formSuffix.en) : null,
      fr: frLanguage ? appendSuffix(frLanguage.name, formSuffix.fr) : null,
      ja: jaLanguage ? appendSuffix(jaLanguage.name, formSuffix.ja) : null
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
  spriteUrl: pokemon => {
    if (pokemon.id > 807) {
      return pokemon.sprites.front_default || DEFAULT_SPRITE_URL;
    }

    return `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/sprite/${pokemon.id}.png`;
  },
  spriteShinyUrl: pokemon => {
    if (pokemon.id > 802) {
      return DEFAULT_SPRITE_URL;
    }

    return `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/sprite-shiny/${pokemon.id}.png`;
  },
  artworkUrl: pokemon => {
    if (pokemon.id > 807) {
      return pokemon.sprites.front_default || DEFAULT_SPRITE_URL;
    }

    return `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/artwork/${pokemon.id}.png`;
  },
  baseHappiness: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);

    return species.base_happiness;
  },
  captureRate: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);

    return species.capture_rate;
  },
  genderRate: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);

    return species.gender_rate;
  },
  eggGroups: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);
    const eggGroupsIds = species.egg_groups
      .map(x => x.url)
      .map(extractEggGroupIdFromEggGroupUrl);

    return Promise.all(eggGroupsIds.map(findEggGroupById));
  },
  varieties: async pokemon => {
    const species = await findPokemonSpeciesByPokemonId(pokemon.id);

    return species.varieties
      .filter(x => !x.is_default)
      .map(x => x.pokemon.url)
      .map(extractPokemonIdFromPokemonUrl)
      .map(findPokemonById);
  }
};
