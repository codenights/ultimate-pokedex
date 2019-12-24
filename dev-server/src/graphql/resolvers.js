const path = require("path");
const { readJSON } = require("fs-extra");

const DB_DIR = path.join(__dirname, "../../data");

const findStatByName = statName => allStats =>
  allStats.find(x => x.stat.name === statName).base_stat;

const findPokemonById = async nationalId => {
  const pokemon = await readJSON(
    path.join(DB_DIR, `pokemon/${nationalId}.json`)
  );
  const spriteId = nationalId.toString().padStart(3, "0");

  return {
    ...pokemon,
    spriteUrl: pokemon.sprites.front_default,
    artworkUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`
  };
};

const extractIdFromUrl = (resource, url) => {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");
  return EXTRACT_URL_REGEXP.exec(url)[1];
};

const extractNationalIdFromEvolutionChainUrl = url =>
  extractIdFromUrl("evolution-chain", url);

const extractNationalIdFromSpeciesUrl = url =>
  extractIdFromUrl("pokemon-species", url);

const extractTypeIdFromTypeUrl = url => extractIdFromUrl("type", url);

const extractVersionIdFromVersionUrl = url => extractIdFromUrl("version", url);

const findPokemonSpeciesByPokemonId = nationalId =>
  readJSON(path.join(DB_DIR, `pokemon-species/${nationalId}.json`));

const findEvolutionChainByPokemonId = async nationalId => {
  const species = await findPokemonSpeciesByPokemonId(nationalId);
  const evolutionChainId = extractNationalIdFromEvolutionChainUrl(
    species.evolution_chain.url
  );

  return readJSON(
    path.join(DB_DIR, `evolution-chain/${evolutionChainId}.json`)
  );
};

const findVersionById = versionId =>
  readJSON(path.join(DB_DIR, `version/${versionId}.json`));

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

module.exports.resolvers = {
  Query: {
    pokemon: async (obj, { nationalId }, ctx) => findPokemonById(nationalId)
  },
  Pokemon: {
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
  },
  PokemonPokedexEntry: {
    version: flavorTextEntry => {
      const versionId = extractVersionIdFromVersionUrl(
        flavorTextEntry.version.url
      );

      return findVersionById(versionId);
    },
    entry: flavorTextEntry => flavorTextEntry.flavor_text.replace(/\n/, " ")
  },
  PokemonStat: {
    hp: findStatByName("hp"),
    attack: findStatByName("attack"),
    defense: findStatByName("defense"),
    specialAttack: findStatByName("special-attack"),
    specialDefense: findStatByName("special-defense"),
    speed: findStatByName("speed")
  },
  Version: {
    name: version => version.names.find(x => x.language.name === "en").name
  }
};
