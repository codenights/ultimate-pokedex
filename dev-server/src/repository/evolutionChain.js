const path = require("path");
const { readJSON } = require("fs-extra");

const { DB_DIR } = require("./config");
const { extractNationalIdFromEvolutionChainUrl } = require("../utils");
const { findPokemonSpeciesByPokemonId } = require("./pokemonSpecies");

module.exports.findEvolutionChainByPokemonId = async nationalId => {
  const species = await findPokemonSpeciesByPokemonId(nationalId);
  const evolutionChainId = extractNationalIdFromEvolutionChainUrl(
    species.evolution_chain.url
  );

  return readJSON(
    path.join(DB_DIR, `evolution-chain/${evolutionChainId}.json`)
  );
};
