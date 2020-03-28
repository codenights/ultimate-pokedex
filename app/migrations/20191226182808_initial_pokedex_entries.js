const path = require("path");
const { readJSON } = require("fs-extra");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const POKEMON_DIR = path.join(__dirname, "../../data/pokemon");
const POKEMON_SPECIES_DIR = path.join(__dirname, "../../data/pokemon-species");

const createPokedexEntryTable = knex =>
  knex.schema.createTable("pokedex_entry", table => {
    table.increments("id");
    table.integer("pokemon_id").unsigned().notNullable();
    table.foreign("pokemon_id").references("pokemon.id");
    table.integer("version_id").unsigned().notNullable();
    table.foreign("version_id").references("version.id");

    table.string("entry").notNullable();
  });

const findSpeciesByPokemon = pokemon => {
  const speciesId = extractIdFromUrl("pokemon-species", pokemon.species.url);
  return readJSON(path.join(POKEMON_SPECIES_DIR, `${speciesId}.json`));
};

const mapPokdexEntryToPokedexEntryDatabase = (pokedexEntry, pokemon) => ({
  pokemon_id: pokemon.id,
  version_id: extractIdFromUrl("version", pokedexEntry.version.url),
  entry: pokedexEntry.flavor_text,
});

const insertAllPokedexEntries = async knex => {
  const allPokemons = await getDirectoryContent(POKEMON_DIR);

  for (const pokemon of allPokemons) {
    const species = await findSpeciesByPokemon(pokemon);

    const pokedexEntries = species.flavor_text_entries
      .filter(entry => entry.language.name === "en")
      .map(entry => mapPokdexEntryToPokedexEntryDatabase(entry, pokemon));

    for (const pokedexEntryDatabase of pokedexEntries) {
      console.log(
        "Importing pokedex entry: ",
        pokedexEntryDatabase.pokemon_id,
        pokedexEntryDatabase.version_id
      );
      await knex.insert(pokedexEntryDatabase).into("pokedex_entry");
    }
  }
};

exports.up = async knex => {
  await createPokedexEntryTable(knex);
  await insertAllPokedexEntries(knex);
};

exports.down = knex => knex.schema.dropTable("pokedex_entry");
