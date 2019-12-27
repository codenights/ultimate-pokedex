const makePublicUrl = url =>
  url
    ? url.replace(
        "https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image",
        ""
      )
    : null;

exports.up = async knex => {
  const pokemons = await knex("pokemon");

  for (const pokemon of pokemons) {
    const newUrls = {
      artwork_url: makePublicUrl(pokemon.artwork_url),
      sprite_url: makePublicUrl(pokemon.sprite_url),
      shiny_sprite_url: makePublicUrl(pokemon.shiny_sprite_url)
    };

    await knex("pokemon")
      .update(newUrls)
      .where({ id: pokemon.id });
  }
};

const makeOldUrl = url =>
  url
    ? `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/dev-server/data/image${url}`
    : null;

exports.down = async knex => {
  const pokemons = await knex("pokemon");

  for (const pokemon of pokemons) {
    const newUrls = {
      artwork_url: makeOldUrl(pokemon.artwork_url),
      sprite_url: makeOldUrl(pokemon.sprite_url),
      shiny_sprite_url: makeOldUrl(pokemon.shiny_sprite_url)
    };

    await knex("pokemon")
      .update(newUrls)
      .where({ id: pokemon.id });
  }
};
