const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findVersionGroupById = versionGroupId =>
  readJSON(path.join(DB_DIR, `version-group/${versionGroupId}.json`));
