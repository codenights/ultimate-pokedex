const { extractTypeIdFromTypeUrl } = require("../../utils");
const { findTypeById } = require("../../repository/type");

module.exports.MoveResolver = {
  name: move => move.names.find(x => x.language.name === "en").name,
  type: move => {
    const typeId = extractTypeIdFromTypeUrl(move.type.url);

    return findTypeById(typeId);
  },
  damageClass: move => move.damage_class.name
};
