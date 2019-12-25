const path = require("path");
const { readJSON, readdir } = require("fs-extra");

const { DB_DIR } = require("./config");

module.exports.findAllAbilities = async () => {
  const allFiles = await readdir(path.join(DB_DIR, "ability"));

  return Promise.all(
    allFiles.map(fileName => readJSON(path.join(DB_DIR, "ability", fileName)))
  );
};

module.exports.findAbilityById = abilityId =>
  readJSON(path.join(DB_DIR, `ability/${abilityId}.json`));
