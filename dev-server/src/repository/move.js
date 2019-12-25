const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findMoveById = moveId =>
  readJSON(path.join(DB_DIR, `move/${moveId}.json`));
