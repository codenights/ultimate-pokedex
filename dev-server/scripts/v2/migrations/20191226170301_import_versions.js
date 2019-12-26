const path = require("path");
const { findEntityByLanguageName } = require("../migrations_utils");
const { getDirectoryContent } = require("../migrations_utils");

const VERSION_DIR = path.join(__dirname, "../../../data/version");

const createVersionTable = async knex =>
  knex.schema.createTable("version", table => {
    table
      .integer("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name_en").notNullable();
  });

const mapVersionToVersionDatabase = version => ({
  id: version.id,
  name_en: findEntityByLanguageName(version.names, "en").name
});

const insertAllVersions = async knex => {
  const allVersions = await getDirectoryContent(VERSION_DIR);

  await knex.transaction(async trx => {
    for (const version of allVersions) {
      const versionDatabase = mapVersionToVersionDatabase(version);

      await trx.insert(versionDatabase).into("version");
    }
  });
};

exports.up = async knex => {
  await createVersionTable(knex);
  await insertAllVersions(knex);
};

exports.down = knex => knex.schema.dropTable("version");
