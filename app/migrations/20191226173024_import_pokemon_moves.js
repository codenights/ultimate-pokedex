const path = require("path");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const POKEMON_DIR = path.join(__dirname, "../../data/pokemon");

const createPokemonMoveTable = async knex =>
  knex.schema.createTable("pokemon_move", table => {
    table.increments("id");
    table
      .integer("move_id")
      .unsigned()
      .notNullable();
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable();
    table
      .integer("version_group_id")
      .unsigned()
      .notNullable();
    table.string("learn_method").notNullable();
    table.integer("learned_at").unsigned();

    table.foreign("pokemon_id").references("pokemon.id");
    table.foreign("move_id").references("move.id");
    table.foreign("version_group_id").references("version_group.id");
  });

const mapPokemonMoveToPokemonMoveDatabase = (
  move,
  pokemon,
  versionGroupDetails
) => {
  const isLevelUpMethod =
    versionGroupDetails.move_learn_method.name === "level-up";

  return {
    pokemon_id: pokemon.id,
    move_id: extractIdFromUrl("move", move.url),
    version_group_id: extractIdFromUrl(
      "version-group",
      versionGroupDetails.version_group.url
    ),
    learn_method: versionGroupDetails.move_learn_method.name,
    learned_at: isLevelUpMethod ? versionGroupDetails.level_learned_at : null
  };
};

const insertPokemonMoves = async knex => {
  const allPokemons = await getDirectoryContent(POKEMON_DIR);

  for (const pokemon of allPokemons) {
    for (const { move, version_group_details } of pokemon.moves) {
      for (const versionGroupDetails of version_group_details) {
        const pokemonMoveDatabase = mapPokemonMoveToPokemonMoveDatabase(
          move,
          pokemon,
          versionGroupDetails
        );

        console.log(
          "Importing pokemon / move: ",
          pokemonMoveDatabase.pokemon_id,
          pokemonMoveDatabase.move_id
        );
        await knex.insert(pokemonMoveDatabase).into("pokemon_move");
      }
    }
  }
};

exports.up = async knex => {
  await createPokemonMoveTable(knex);
  await insertPokemonMoves(knex);
};

exports.down = knex => knex.schema.dropTable("pokemon_move");
