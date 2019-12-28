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

  for (const versionGroups of allVersionGroups) {
    const versionGroupsDatabase = mapVersionGroupToVersionGroupDatabase(
      versionGroups
    );

    console.log("Importing version group: ", versionGroupsDatabase.id);
    await knex.insert(versionGroupsDatabase).into("version_group");

    const versionIds = versionGroups.versions
      .map(x => x.url)
      .map(url => extractIdFromUrl("version", url));

    for (const versionId of versionIds) {
      await knex("version")
        .where({ id: versionId })
        .update({ version_group_id: versionGroupsDatabase.id });
    }
  }
};

exports.up = async knex => {
  await createVersionGroupTable(knex);
  await insertAllVersionGroups(knex);
};

exports.down = knex =>
  knex.schema
    .alterTable("version", table => {
      table.dropForeign("version_group_id");
      table.dropColumn("version_group_id");
    })
    .dropTable("version_group");
