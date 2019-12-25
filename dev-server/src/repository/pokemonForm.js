const path = require("path");
const { readJSON } = require("fs-extra");

const { extractPokemonFormIdFromPokemonFormUrl } = require("../utils");
const { findPokemonById } = require("./pokemon");
const { DB_DIR } = require("./config");

module.exports.findPokemonFormByPokemonId = async pokemonId => {
  const pokemon = await findPokemonById(pokemonId);
  const [form] = pokemon.forms;
  const formId = extractPokemonFormIdFromPokemonFormUrl(form.url);

  return readJSON(path.join(DB_DIR, `pokemon-form/${formId}.json`));
};
