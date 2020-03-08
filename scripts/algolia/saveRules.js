const { mainIndex } = require("./algoliaIndices");

const rules = [
  {
    objectID: "starter",
    description: "Display starters",
    condition: {
      pattern: "starter",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["starter:true"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "fabulous",
    description: "Display fabulous",
    condition: {
      pattern: "fabulous",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["fabulous:true"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  // {
  //   objectID: "legendary",
  //   description: "Display legendaries",
  //   condition: {
  //     pattern: "legendary",
  //     anchoring: "contains",
  //     alternatives: true,
  //   },
  //   consequence: {
  //     params: {
  //       facetFilters: ["legendary:true"],
  //       query: "",
  //     },
  //     filterPromotes: true,
  //   },
  // },
];

async function saveRules() {
  try {
    for (const rule of rules) {
      await mainIndex.saveRule(rule, {
        forwardToReplicas: mainIndex.indexName.startsWith("dev_") === false,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  saveRules,
};
