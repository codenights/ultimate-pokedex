const path = require("path");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const VERSION_GROUP_DIR = path.join(__dirname, "../../data/version-group");

const createVersionGroupTable = async knex =>
  knex.schema
    .createTable("version_group", table => {
      table
        .integer("id")
        .unsigned()
        .notNullable()
        .primary();
    })
    .alterTable("version", table => {
      table.integer("version_group_id").unsigned();
      table.foreign("version_group_id").references("version_group.id");
    });

const mapVersionGroupToVersionGroupDatabase = versionGroup => ({
  id: versionGroup.id
});

const insertAllVersionGroups = async knex => {
  const allVersionGroups = await getDirectoryContent(VERSION_GROUP_DIR);

  await knex.transaction(async trx => {
    for (const versionGroups of allVersionGroups) {
      const versionGroupsDatabase = mapVersionGroupToVersionGroupDatabase(
        versionGroups
      );

      await trx.insert(versionGroupsDatabase).into("version_group");

      const versionIds = versionGroups.versions
        .map(x => x.url)
        .map(url => extractIdFromUrl("version", url));

      for (const versionId of versionIds) {
        await trx("version")
          .where({ id: versionId })
          .update({ version_group_id: versionGroupsDatabase.id });
      }
    }
  });
};

exports.up = async knex => {
  await createVersionGroupTable(knex);
  await insertAllVersionGroups(knex);
};

exports.down = knex =>
  knex.schema
    .alterTable("version", table => {
      table.dropColumn("version_group_id");
    })
    .dropTable("version_group");
