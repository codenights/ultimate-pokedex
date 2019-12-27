const path = require("path");
const {
  getDirectoryContent,
  findEntityByLanguageName
} = require("../migrations_utils");

const EGG_GROUP_DIR = path.join(__dirname, "../../../data/egg-group");

const createEggGroupTable = async knex =>
  knex.schema.createTable("egg_group", table => {
    table
      .integer("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name").notNullable();
  });

const mapEggGroupToEggGroupDatabase = eggGroup => ({
  id: eggGroup.id,
  name: findEntityByLanguageName(eggGroup.names, "en").name
});

const insertAllEggGroups = async knex => {
  const allEggGroups = await getDirectoryContent(EGG_GROUP_DIR);

  await knex.transaction(async trx => {
    for (const eggGroup of allEggGroups) {
      const eggGroupDatabase = mapEggGroupToEggGroupDatabase(eggGroup);

      await trx.insert(eggGroupDatabase).into("egg_group");
    }
  });
};

exports.up = async knex => {
  await createEggGroupTable(knex);
  await insertAllEggGroups(knex);
};

exports.down = knex => knex.schema.dropTable("egg_group");
