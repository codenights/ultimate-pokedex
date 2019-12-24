const path = require("path");
const { readJSON } = require("fs-extra");
const { DB_DIR } = require("./config");

module.exports.findPokemonSpeciesByPokemonId = nationalId =>
  readJSON(path.join(DB_DIR, `pokemon-species/${nationalId}.json`));
