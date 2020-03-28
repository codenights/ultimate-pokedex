const path = require("path");
const { readJSON, readdir } = require("fs-extra");

async function getDirectoryContent<TData>(dir: string) {
  const fileNames = await readdir(dir);
  const files = fileNames.map(name => path.join(dir, name));

  return Promise.all<TData>(files.map(name => readJSON(name)));
}

function findEntityByLanguageName(entities, languageName) {
  return entities.find(x => x.language.name === languageName);
}

function extractIdFromUrl(resource, url) {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");

  return EXTRACT_URL_REGEXP.exec(url)[1];
}

module.exports = {
  getDirectoryContent,
  findEntityByLanguageName,
  extractIdFromUrl,
};
