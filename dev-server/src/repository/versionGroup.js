module.exports.VersionGroupRepository = function(knex) {
  return {
    findVersionGroupById(versionGroupId) {
      return knex("version_group")
        .first()
        .where({ id: versionGroupId });
    }
  };
};
