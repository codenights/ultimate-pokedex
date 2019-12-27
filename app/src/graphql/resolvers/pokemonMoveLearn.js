import * as R from "ramda";

export const PokemonMoveLearnResolver = {
  versionGroup: ({ version_group_id }, args, { versionGroupRepository }) =>
    versionGroupRepository.findVersionGroupById(version_group_id),
  level: R.prop("learned_at"),
  method: R.prop("learn_method")
};
