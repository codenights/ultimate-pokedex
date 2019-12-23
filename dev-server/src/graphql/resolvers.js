const path = require("path");
const { readJSON } = require("fs-extra");

const DB_DIR = path.join(__dirname, "../../data");

const findStatByName = statName => allStats =>
  allStats.find(x => x.stat.name === statName).base_stat;

module.exports.resolvers = {
  Query: {
    pokemon: async (obj, { nationalId }, ctx) => {
      const pokemon = await readJSON(
        path.join(DB_DIR, `pokemon/${nationalId}.json`)
      );
      const spriteId = nationalId.toString().padStart(3, "0");

      return {
        ...pokemon,
        spriteUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`
      };
    }
  },
  Pokemon: {
    types: pokemon =>
      pokemon.types.map(x => {
        const EXTRACT_ID_FROM_URL_REGEXP = /\/type\/([0-9]*)/g;
        const typeId = EXTRACT_ID_FROM_URL_REGEXP.exec(x.type.url)[1];

        return readJSON(path.join(DB_DIR, `type/${typeId}.json`));
      })
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
