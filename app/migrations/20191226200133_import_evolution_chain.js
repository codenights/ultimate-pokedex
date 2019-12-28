const path = require("path");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const EVOLUTION_DIR = path.join(__dirname, "../../data/evolution-chain");

const createEvolutionTable = async knex =>
  knex.schema.createTable("evolution", table => {
    table.increments("id");
    table
      .integer("evolves_from_id")
      .unsigned()
      .notNullable();
    table.foreign("evolves_from_id").references("pokemon.id");

    table
      .integer("evolves_to_id")
      .unsigned()
      .notNullable();
    table.foreign("evolves_to_id").references("pokemon.id");
  });

const mapEvolutionsToEvolutionDatabases = evolution =>
  evolution.evolves_to.map(x => ({
    evolves_from_id: extractIdFromUrl("pokemon-species", evolution.species.url),
    evolves_to_id: extractIdFromUrl("pokemon-species", x.species.url)
  }));

const findEvolutions = evolution => {
  const evolutionDatabases = mapEvolutionsToEvolutionDatabases(evolution);

  for (const nextEvolution of evolution.evolves_to) {
    console.log("Importing evolution chain...");
    evolutionDatabases.push(...findEvolutions(nextEvolution));
  }

  return evolutionDatabases;
};

const importAllEvolutions = async knex => {
  const allEvolutions = await getDirectoryContent(EVOLUTION_DIR);

  for (const evolution of allEvolutions) {
    const chain = evolution.chain;
    const evolutionDatabases = findEvolutions(chain);

    for (const evolutionDatabase of evolutionDatabases) {
      await knex.insert(evolutionDatabase).into("evolution");
    }
  }
};

exports.up = async knex => {
  await createEvolutionTable(knex);
  await importAllEvolutions(knex);
};

exports.down = knex => knex.schema.dropTable("evolution");
