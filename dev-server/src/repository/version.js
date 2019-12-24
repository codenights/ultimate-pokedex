const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findVersionById = versionId =>
  readJSON(path.join(DB_DIR, `version/${versionId}.json`));
