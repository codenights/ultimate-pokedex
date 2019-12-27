const R = require("ramda");

module.exports.MoveResolver = {
  type: ({ type_id }, args, { typeRepository }) =>
    typeRepository.findTypeById(type_id),
  damageClass: R.prop("damage_class")
};
