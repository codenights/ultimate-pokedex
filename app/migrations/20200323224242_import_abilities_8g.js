const path = require("path");
const { readJSON } = require("fs-extra");

const DIR = path.join(__dirname, "../../data/pokemon-next");
const FILE = path.join(DIR, "abilities-8-gen.json");

const mapToDatabase = ability => ({
  id: ability.id,
  name_en: ability.name,
  name_fr: null,
  name_ja: null,
  description: ability.description,
});

const insertAll = async knex => {
  const abilities = await readJSON(FILE);

  for (const ability of abilities) {
    const abilityDatabase = mapToDatabase(ability);
    console.log("Importing ability: ", abilityDatabase.id);

    await knex.insert(abilityDatabase).into("ability");
  }
};

const deleteAll = async knex => {
  await knex("ability").where("id", ">", 233).andWhere("id", "<", 259).del();
};

exports.up = async knex => {
  await insertAll(knex);
};

exports.down = async knex => {
  await deleteAll(knex);
};
