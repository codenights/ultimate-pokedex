module.exports.TypeRepository = function(knex) {
  return {
    findTypeById(typeId) {
      return knex("type")
        .first()
        .where({ id: typeId });
    }
  };
};
