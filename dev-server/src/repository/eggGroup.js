const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findEggGroupById = eggGroupId =>
  readJSON(path.join(DB_DIR, `egg-group/${eggGroupId}.json`));
