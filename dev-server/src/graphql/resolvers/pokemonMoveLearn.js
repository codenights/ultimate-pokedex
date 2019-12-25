const { findVersionGroupById } = require("../../repository/versionGroup");
const { extractVersionGroupIdFromUrl } = require("../../utils");

module.exports.PokemonMoveLearnResolver = {
  versionGroup: pokemonMoveLearn => {
    const versionGroupId = extractVersionGroupIdFromUrl(
      pokemonMoveLearn.version_group.url
    );

    return findVersionGroupById(versionGroupId);
  },
  level: pokemonMoveLearn => pokemonMoveLearn.level_learned_at,
  method: pokemonMoveLearn => pokemonMoveLearn.move_learn_method.name
};
