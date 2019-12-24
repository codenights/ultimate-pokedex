const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findPokemonById = async nationalId => {
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
