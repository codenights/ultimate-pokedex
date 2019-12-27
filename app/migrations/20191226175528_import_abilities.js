const path = require("path");
const { getDirectoryContent, findEntityByLanguageName } = require("./utils");

const ABILITY_DIR = path.join(__dirname, "../../data/ability");

const createAbilityTable = async knex =>
  knex.schema.createTable("ability", table => {
    table
      .integer("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name_en").notNullable();
    table.string("name_fr");
    table.string("name_ja");
    table.string("description").notNullable();
  });

const mapAbilityToAbilityDatabase = ability => ({
  id: ability.id,
  name_en: findEntityByLanguageName(ability.names, "en").name,
  name_fr: findEntityByLanguageName(ability.names, "fr")
    ? findEntityByLanguageName(ability.names, "fr").name
    : null,
  name_ja: findEntityByLanguageName(ability.names, "roomaji")
    ? findEntityByLanguageName(ability.names, "roomaji").name
    : null,
  description: findEntityByLanguageName(ability.effect_entries, "en").effect
});

const insertAllAbilities = async knex => {
  const allAbilities = await getDirectoryContent(ABILITY_DIR);

  await knex.transaction(async trx => {
    for (const ability of allAbilities) {
      const abilityDatabase = mapAbilityToAbilityDatabase(ability);

      await trx.insert(abilityDatabase).into("ability");
    }
  });
};

exports.up = async knex => {
  await createAbilityTable(knex);
  await insertAllAbilities(knex);
};

exports.down = knex => knex.schema.dropTable("ability");
