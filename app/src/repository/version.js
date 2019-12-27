export function VersionRepository(knex) {
  return {
    findVersionById(versionId) {
      return knex("version")
        .first()
        .where({ id: versionId });
    },
    findVersionsByVersionGroupId(versionGroupId) {
      return knex("version").where({ version_group_id: versionGroupId });
    }
  };
}
