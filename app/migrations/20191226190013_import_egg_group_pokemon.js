const path = require("path");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const EGG_GROUP_DIR = path.join(__dirname, "../../data/egg-group");

const createEggGroupPokemon = async knex =>
  knex.schema.createTable("egg_group_pokemon", table => {
    table.increments("id");
    table
      .integer("egg_group_id")
      .unsigned()
      .notNullable();
    table.foreign("egg_group_id").references("egg_group.id");
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable();
    table.foreign("pokemon_id").references("pokemon.id");
  });

const mapEggGroupPokemonToEggGroupPokemonDatabase = (species, eggGroup) => ({
  egg_group_id: eggGroup.id,
  pokemon_id: extractIdFromUrl("pokemon-species", species.url)
});

const insertEggGroupPokemons = async knex => {
  const allEggGroups = await getDirectoryContent(EGG_GROUP_DIR);

  for (const eggGroup of allEggGroups) {
    const eggGroupPokemonDatabases = eggGroup.pokemon_species.map(species =>
      mapEggGroupPokemonToEggGroupPokemonDatabase(species, eggGroup)
    );

    for (const eggGroupPokemonDatabase of eggGroupPokemonDatabases) {
      await knex.insert(eggGroupPokemonDatabase).into("egg_group_pokemon");
    }
  }
};

exports.up = async knex => {
  await createEggGroupPokemon(knex);
  await insertEggGroupPokemons(knex);
};

exports.down = knex => knex.schema.dropTable("egg_group_pokemon");
