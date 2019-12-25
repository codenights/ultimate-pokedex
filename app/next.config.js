require("dotenv").config();
const fetch = require("isomorphic-unfetch");

const graphql = async query => {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const { data } = await response.json();

  return data;
};

const fetchAllPokemons = async () => {
  const query = `
  {
    pokemons {
      id
    } 
  }
  `;

  const { pokemons } = await graphql(query);

  return pokemons;
};

const fetchAllAbilities = async () => {
  const query = `
  {
    abilities {
      id
    } 
  }
  `;

  const { abilities } = await graphql(query);

  return abilities;
};

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      "/": { page: "/" }
    };

    const [pokemons, abilities] = await Promise.all([
      fetchAllPokemons(),
      fetchAllAbilities()
    ]);

    pokemons.forEach(pokemon => {
      paths[`/pokemon/${pokemon.id}`] = {
        page: "/pokemon/[nationalId]",
        query: { nationalId: pokemon.id }
      };
    });

    abilities.forEach(ability => {
      paths[`/ability/${ability.id}`] = {
        page: "/ability/[abilityId]",
        query: { abilityId: ability.id }
      };
    });

    return paths;
  },
  env: {
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY
  }
};
