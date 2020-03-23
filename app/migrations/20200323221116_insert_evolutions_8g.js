const path = require("path");
const { readJSON } = require("fs-extra");

const DIR = path.join(__dirname, "../../data/pokemon-next");
const FILE = path.join(DIR, "evolutions-8-gen.json");

const insertAll = async knex => {
  const evolutions = await readJSON(FILE);

  for (const evolution of evolutions) {
    console.log(
      "Importing evolution: ",
      `${evolution.evolves_from_id} -> ${evolution.evolves_to_id}`
    );

    await knex.insert(evolution).into("evolution");
  }
};

const deleteAll = async knex => {
  await knex("evolution")
    .where("evolves_from_id", ">", 809)
    .andWhere("evolves_from_id", "<", 891)
    .del();
};

exports.up = async knex => {
  await insertAll(knex);
};

exports.down = async knex => {
  await deleteAll(knex);
};
