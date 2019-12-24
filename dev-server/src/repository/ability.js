const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findAbilityById = abilityId =>
  readJSON(path.join(DB_DIR, `ability/${abilityId}.json`));
