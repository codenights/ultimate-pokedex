const path = require("path");
const { readJSON } = require("fs-extra");

const { extractNationalIdFromSpeciesUrl } = require("../utils");
const { findPokemonById } = require("./pokemon");
const { DB_DIR } = require("./config");

module.exports.findPokemonSpeciesByPokemonId = async nationalId => {
  const pokemon = await findPokemonById(nationalId);
  const speciesId = extractNationalIdFromSpeciesUrl(pokemon.species.url);

  return readJSON(path.join(DB_DIR, `pokemon-species/${speciesId}.json`));
};
