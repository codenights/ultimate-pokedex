const path = require("path");
const { readJSON, readdir } = require("fs-extra");

module.exports.getDirectoryContent = async dir => {
  const fileNames = await readdir(dir);
  const files = fileNames.map(name => path.join(dir, name));

  return Promise.all(files.map(name => readJSON(name)));
};

module.exports.findEntityByLanguageName = (entities, languageName) =>
  entities.find(x => x.language.name === languageName);

module.exports.extractIdFromUrl = (resource, url) => {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");
  return EXTRACT_URL_REGEXP.exec(url)[1];
};
