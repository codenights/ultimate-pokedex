const path = require("path");
const {
  findEntityByLanguageName,
  extractIdFromUrl,
  getDirectoryContent
} = require("../migrations_utils");

const MOVE_DIR = path.join(__dirname, "../../../data/move");

const createMoveTable = async knex =>
  knex.schema.createTable("move", table => {
    table
      .integer("id")
      .unsigned()
      .notNullable()
      .primary();
    table.string("name").notNullable();
    table.integer("accuracy").unsigned();
    table.integer("power").unsigned();
    table
      .integer("pp")
      .unsigned()
      .notNullable();
    table.integer("priority").notNullable();
    table
      .integer("type_id")
      .unsigned()
      .notNullable();

    table.foreign("type_id").references("type.id");
  });

const mapMoveToMoveDatabase = move => ({
  id: move.id,
  name: findEntityByLanguageName(move.names, "en").name,
  accuracy: move.accuracy,
  power: move.power,
  pp: move.pp,
  priority: move.priority,
  type_id: extractIdFromUrl("type", move.type.url)
});

const insertAllMoves = async knex => {
  const allMoves = await getDirectoryContent(MOVE_DIR);

  await knex.transaction(async trx => {
    for (const move of allMoves) {
      const moveDatabase = mapMoveToMoveDatabase(move);
      await trx.insert(moveDatabase).into("move");
    }
  });
};

exports.up = async knex => {
  await createMoveTable(knex);
  await insertAllMoves(knex);
};

exports.down = knex => knex.schema.dropTable("move");
