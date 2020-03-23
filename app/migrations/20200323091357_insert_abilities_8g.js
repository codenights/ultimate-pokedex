const path = require("path");
const { readJSON } = require("fs-extra");

const DIR = path.join(__dirname, "../../data/pokemon-next");
const ABILITIES_FILE = path.join(DIR, "abilities-8-gen.json");

const mapAbilityToAbilityDatabase = ability => ({
  id: ability.id,
  name_en: ability.name,
  name_fr: null,
  name_ja: null,
  description: ability.description,
});

const insert8thGenAbilities = async knex => {
  const abilities = await readJSON(ABILITIES_FILE);

  for (const ability of abilities) {
    const abilityDatabase = mapAbilityToAbilityDatabase(ability);
    console.log("Importing ability: ", abilityDatabase.id);

    await knex.insert(abilityDatabase).into("ability");
  }
};

const delete8thGenAbilities = async knex => {
  await knex("ability")
    .where("id", ">", 233)
    .andWhere("id", "<", 259)
    .del();
};

exports.up = async knex => {
  await insert8thGenAbilities(knex);
};

exports.down = async knex => {
  await delete8thGenAbilities(knex);
};
