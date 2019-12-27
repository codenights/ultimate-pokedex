const path = require("path");
const { pathExists } = require("fs-extra");
const ARTWORK_DIR = path.join(__dirname, "../../data/image/artwork");

const hasNewArtwork = async pokemon => {
  const fileName = path.join(ARTWORK_DIR, `${pokemon.id}.png`);

  return pathExists(fileName);
};

exports.up = async knex => {
  const pokemons = await knex("pokemon").where("id", ">", 10000);

  for (const pokemon of pokemons) {
    const shouldUpdateArtwork = await hasNewArtwork(pokemon);

    if (shouldUpdateArtwork) {
      console.log("Updating pokemon:", pokemon.id);
      await knex("pokemon")
        .update({
          artwork_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/artwork/${pokemon.id}.png`
        })
        .where({ id: pokemon.id });
    }
  }
};

exports.down = async knex => {
  const pokemons = await knex("pokemon").where("id", ">", 10000);

  for (const pokemon of pokemons) {
    await knex("pokemon")
      .update({
        artwork_url: `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image/artwork/${pokemon.species_id}.png`
      })
      .where({ id: pokemon.id });
  }
};
