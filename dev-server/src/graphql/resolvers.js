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
    spriteUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`
  };
};

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
        const EXTRACT_ID_FROM_URL_REGEXP = /\/type\/([0-9]*)/g;
        const typeId = EXTRACT_ID_FROM_URL_REGEXP.exec(x.type.url)[1];

        return readJSON(path.join(DB_DIR, `type/${typeId}.json`));
      }),
    evolutions: async pokemon => {
      const EXTRACT_ID_FROM_URL_REGEXP = /\/evolution-chain\/([0-9]*)/g;
      const species = await readJSON(
        path.join(DB_DIR, `pokemon-species/${pokemon.id}.json`)
      );
      const evolutionChainId = EXTRACT_ID_FROM_URL_REGEXP.exec(
        species.evolution_chain.url
      )[1];
      const evolutionChain = await readJSON(
        path.join(DB_DIR, `evolution-chain/${evolutionChainId}.json`)
      );

      const evolutions = findEvolutions(pokemon, evolutionChain.chain);

      return Promise.all(
        evolutions.map(evolution => {
          const EXTRACT_ID_FROM_URL_REGEXP = /\/pokemon-species\/([0-9]*)/g;
          const nationalId = EXTRACT_ID_FROM_URL_REGEXP.exec(
            evolution.species.url
          )[1];

          return { pokemon: findPokemonById(nationalId) };
        })
      );
    }
  },
  PokemonStat: {
    hp: findStatByName("hp"),
    attack: findStatByName("attack"),
    defense: findStatByName("defense"),
    specialAttack: findStatByName("special-attack"),
    specialDefense: findStatByName("special-defense"),
    speed: findStatByName("speed")
  }
};
