require("dotenv").config();

module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      "/": { page: "/" }
    };
    const pokemonCount = 807;

    for (let nationalId = 1; nationalId <= pokemonCount; nationalId += 1) {
      paths[`/pokemon/${nationalId}`] = {
        page: "/pokemon/[nationalId]",
        query: { nationalId: nationalId }
      };
    }

    return paths;
  },
  env: {
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY
  }
};
