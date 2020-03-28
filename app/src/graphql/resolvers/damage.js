import * as R from "ramda";

export const DamageResolver = {
  multiplier: R.prop("total_multiplier"),

  type: (damage, args, { typeRepository }) =>
    typeRepository.findTypeById.load(damage.type_from_id),
};
