const { findMoveById } = require("../../repository/move");
const { extractMoveIdFromUrl } = require("../../utils");

module.exports.PokemonMoveResolver = {
  move: pokemonMove => {
    const moveId = extractMoveIdFromUrl(pokemonMove.move.url);

    return findMoveById(moveId);
  },
  learn: pokemonMove => pokemonMove.version_group_details
};
