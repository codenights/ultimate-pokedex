const fetch = require("isomorphic-unfetch");

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
  }
};
