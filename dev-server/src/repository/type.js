const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findTypeById = typeId =>
  readJSON(path.join(DB_DIR, `type/${typeId}.json`));
