const algoliasearch = require("algoliasearch");
const fetch = require("isomorphic-unfetch");
require("dotenv").config();

const POKEMON_COUNT = 807;
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const fetchPokemonQuery = nationalId => `
  {
    pokemon(nationalId: "${nationalId}") {
      id
      names {
        en
        fr
        ja
      }
      artworkUrl
      spriteUrl
      spriteShinyUrl
      weight
      height

      stats {
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
      }
      
      types {
        id
        name
        color
      }
    }
  }
`;

async function run() {
  const pokemonsToIndex = [];

  for (let id = 1; id <= POKEMON_COUNT; id += 1) {
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fetchPokemonQuery(id) })
      });
      const { data } = await response.json();
      const { pokemon } = data;

      const algoliaPokemon = {
        ...pokemon,
        objectID: pokemon.id,
        // Algolia needs a number attribute to sort records.
        order: Number(pokemon.id)
      };

      pokemonsToIndex.push(algoliaPokemon);
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const content = await index.saveObjects(pokemonsToIndex);

    console.log(content);
  } catch (error) {
    console.log(error);
  }
}

run();
