const extractIdFromUrl = (resource, url) => {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");
  return EXTRACT_URL_REGEXP.exec(url)[1];
};

const extractTypeIdFromTypeUrl = url => extractIdFromUrl("type", url);

const extractNationalIdFromEvolutionChainUrl = url =>
  extractIdFromUrl("evolution-chain", url);

const extractNationalIdFromSpeciesUrl = url =>
  extractIdFromUrl("pokemon-species", url);

const extractVersionIdFromVersionUrl = url => extractIdFromUrl("version", url);

const extractAbilityIdFromUrl = url => extractIdFromUrl("ability", url);

const extractMoveIdFromUrl = url => extractIdFromUrl("move", url);

const extractVersionGroupIdFromUrl = url =>
  extractIdFromUrl("version-group", url);

module.exports = {
  extractIdFromUrl,
  extractTypeIdFromTypeUrl,
  extractNationalIdFromEvolutionChainUrl,
  extractNationalIdFromSpeciesUrl,
  extractVersionIdFromVersionUrl,
  extractAbilityIdFromUrl,
  extractMoveIdFromUrl,
  extractVersionGroupIdFromUrl
};
