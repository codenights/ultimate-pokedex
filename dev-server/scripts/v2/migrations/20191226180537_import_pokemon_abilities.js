const path = require("path");
const { extractIdFromUrl } = require("../migrations_utils");
const { getDirectoryContent } = require("../migrations_utils");

const ABILITY_DIR = path.join(__dirname, "../../../data/ability");

const createPokemonAbilityTable = async knex =>
  knex.schema.createTable("pokemon_ability", table => {
    table.increments("id");
    table
      .integer("pokemon_id")
      .unsigned()
      .notNullable();
    table.foreign("pokemon_id").references("pokemon.id");
    table
      .integer("ability_id")
      .unsigned()
      .notNullable();
    table.foreign("ability_id").references("ability.id");
    table.boolean("is_hidden").notNullable();
  });

const mapPokemonAbilityToPokemonAbilityDatabase = (
  ability,
  pokemonAbility
) => ({
  pokemon_id: extractIdFromUrl("pokemon", pokemonAbility.pokemon.url),
  ability_id: ability.id,
  is_hidden: pokemonAbility.is_hidden
});

const importAllPokemonAbilities = async knex => {
  const allAbilities = await getDirectoryContent(ABILITY_DIR);

  await knex.transaction(async trx => {
    for (const ability of allAbilities) {
      for (const pokemonAbility of ability.pokemon) {
        const pokemonAbilityDatabase = mapPokemonAbilityToPokemonAbilityDatabase(
          ability,
          pokemonAbility
        );

        await trx.insert(pokemonAbilityDatabase).into("pokemon_ability");
      }
    }
  });
};

exports.up = async knex => {
  await createPokemonAbilityTable(knex);
  await importAllPokemonAbilities(knex);
};

exports.down = knex => knex.schema.dropTable("pokemon_ability");
