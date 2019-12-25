const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findPokemonById = async nationalId =>
  readJSON(path.join(DB_DIR, `pokemon/${nationalId}.json`));
