const path = require("path");
const { getDirectoryContent } = require("../migrations_utils");

const TYPE_DIR = path.join(__dirname, "../../data/type");
const COLORS_BY_TYPE = {
  poison: "#a59",
  grass: "#7c5",
  fire: "#f42",
  flying: "#89f",
  water: "#39f",
  electric: "#fc3",
  dragon: "#76e",
  ice: "#6cf",
  fighting: "#b54",
  rock: "#ba6",
  ground: "#db5",
  psychic: "#f59",
  bug: "#ab2",
  dark: "#754",
  steel: "#aab",
  fairy: "#e9e",
  ghost: "#66b",
  normal: "#aa9"
};

const createTypeTable = knex =>
  knex.schema.createTable("type", table => {
    table.integer("id").primary();
    table.string("color").notNullable();
    table.string("name_en").notNullable();
  });

const mapTypeToTypeDatabase = type => ({
  id: type.id,
  color: COLORS_BY_TYPE[type.name],
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
