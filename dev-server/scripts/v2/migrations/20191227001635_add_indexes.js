const columnNames = ["move_id", "pokemon_id"];

exports.up = knex =>
  knex.schema.alterTable("pokemon_move", table => {
    table.index(columnNames);
  });

exports.down = knex =>
  knex.schema.alterTable("pokemon_move", table => {
    table.dropIndex(columnNames);
  });
