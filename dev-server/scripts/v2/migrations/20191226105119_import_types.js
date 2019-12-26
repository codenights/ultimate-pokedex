const path = require("path");
const { getDirectoryContent } = require("../migrations_utils");

const TYPE_DIR = path.join(__dirname, "../../../data/type");

const createTypeTable = knex =>
  knex.schema.createTable("type", table => {
    table.integer("id").primary();
    table
      .integer("name_en")
      .notNullable()
      .unsigned();
  });

const mapTypeToTypeDatabase = type => ({
  id: type.id,
  name_en: type.names.find(x => x.language.name === "en").name
});

const insertTypes = async knex => {
  const allTypes = await getDirectoryContent(TYPE_DIR);

  await knex.transaction(async trx => {
    for (const type of allTypes) {
      const typeDatabase = mapTypeToTypeDatabase(type);

      await trx.insert(typeDatabase).into("type");
    }
  });
};

exports.up = async knex => {
  await createTypeTable(knex);
  await insertTypes(knex);
};

exports.down = knex => knex.schema.dropTable("type");
