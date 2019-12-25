const path = require("path");
const { readJSON, readdir } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findAllPokemons = async () => {
  const allFiles = await readdir(path.join(DB_DIR, "pokemon"));

  return Promise.all(
    allFiles.map(fileName => readJSON(path.join(DB_DIR, "pokemon", fileName)))
  );
};

module.exports.findPokemonById = async nationalId =>
  readJSON(path.join(DB_DIR, `pokemon/${nationalId}.json`));
