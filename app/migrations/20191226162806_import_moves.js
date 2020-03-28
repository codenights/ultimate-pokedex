const path = require("path");
const {
  findEntityByLanguageName,
  extractIdFromUrl,
  getDirectoryContent,
} = require("./utils");

const MOVE_DIR = path.join(__dirname, "../../data/move");

const createMoveTable = async knex =>
  knex.schema.createTable("move", table => {
    table.integer("id").unsigned().notNullable().primary();
    table.string("damage_class").notNullable();
    table.string("name").notNullable();
    table.integer("accuracy").unsigned();
    table.integer("power").unsigned();
    table.integer("pp").unsigned().notNullable();
    table.integer("priority").notNullable();
    table.integer("type_id").unsigned().notNullable();

    table.foreign("type_id").references("type.id");
  });

const mapMoveToMoveDatabase = move => ({
  id: move.id,
  damage_class: move.damage_class.name,
  name: findEntityByLanguageName(move.names, "en").name,
  accuracy: move.accuracy,
  power: move.power,
  pp: move.pp,
  priority: move.priority,
  type_id: extractIdFromUrl("type", move.type.url),
});

const insertAllMoves = async knex => {
  const allMoves = await getDirectoryContent(MOVE_DIR);

  for (const move of allMoves) {
    const moveDatabase = mapMoveToMoveDatabase(move);
    console.log("Importing move: ", moveDatabase.id);
    await knex.insert(moveDatabase).into("move");
  }
};

exports.up = async knex => {
  await createMoveTable(knex);
  await insertAllMoves(knex);
};

exports.down = knex => knex.schema.dropTable("move");
