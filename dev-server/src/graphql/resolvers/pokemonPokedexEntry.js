const { extractVersionIdFromVersionUrl } = require("../../utils");
const { findVersionById } = require("../../repository/version");

module.exports.PokemonPokedexEntryResolver = {
  version: flavorTextEntry => {
    const versionId = extractVersionIdFromVersionUrl(
      flavorTextEntry.version.url
    );

    return findVersionById(versionId);
  },
  entry: flavorTextEntry => flavorTextEntry.flavor_text.replace(/\n/, " ")
};
