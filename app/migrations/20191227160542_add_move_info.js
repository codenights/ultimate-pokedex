const path = require("path");
const { findEntityByLanguageName, getDirectoryContent } = require("./utils");

const MOVE_DIR = path.join(__dirname, "../../data/move");

const alterMoveTable = async knex =>
  knex.schema.alterTable("move", table => {
    table
      .string("description")
      .notNullable()
      .defaultTo("");
    table
      .integer("critical_rate")
      .notNullable()
      .defaultTo(0);
    table.integer("drain");
    table
      .integer("flinch_chance")
      .notNullable()
      .defaultTo(0);
    table.integer("healing");
  });

const mapMoveToMoveDatabase = move => ({
  description: findEntityByLanguageName(
    move.effect_entries,
    "en"
  ).effect.replace("$effect_chance", move.effect_chance),
  critical_rate: move.meta.crit_rate,
  drain: move.meta.drain || null,
  flinch_chance: move.meta.flinch_chance,
  healing: move.meta.healing || null
});

const importAllMovesData = async knex => {
  const allMoves = await getDirectoryContent(MOVE_DIR);

  for (const move of allMoves) {
    const moveDatabase = mapMoveToMoveDatabase(move);

    await knex("move")
      .update(moveDatabase)
      .where({ id: move.id });
  }
};

exports.up = async knex => {
  await alterMoveTable(knex);
  await importAllMovesData(knex);
};

exports.down = knex =>
  knex.schema.alterTable("move", table => {
    table.dropColumn("description");
    table.dropColumn("critical_rate");
    table.dropColumn("drain");
    table.dropColumn("flinch_chance");
    table.dropColumn("healing");
  });
