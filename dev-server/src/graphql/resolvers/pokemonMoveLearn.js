const R = require("ramda");

module.exports.PokemonMoveLearnResolver = {
  versionGroup: ({ version_group_id }, args, { versionGroupRepository }) =>
    versionGroupRepository.findVersionGroupById(version_group_id),
  level: R.prop("learned_at"),
  method: R.prop("learn_method")
};
