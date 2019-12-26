const extractIdFromUrl = (resource, url) => {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");
  return EXTRACT_URL_REGEXP.exec(url)[1];
};

const extractNationalIdFromSpeciesUrl = url =>
  extractIdFromUrl("pokemon-species", url);

const extractPokemonIdFromPokemonUrl = url => extractIdFromUrl("pokemon", url);

module.exports = {
  extractIdFromUrl,
  extractNationalIdFromSpeciesUrl,
  extractPokemonIdFromPokemonUrl
};
