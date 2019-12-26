module.exports.AbilityRepository = function(knex) {
  return {
    findAllAbilities() {
      return knex("ability").select();
    },
    findAbilityById(abilityId) {
      return knex("ability")
        .select()
        .first()
        .where({ id: abilityId });
    }
  };
};
