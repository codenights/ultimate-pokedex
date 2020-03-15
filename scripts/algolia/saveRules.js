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
  {
    objectID: "baby",
    description: "Display babies",
    condition: {
      pattern: "baby",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["baby:true"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "legendary",
    description: "Display legendaries",
    condition: {
      pattern: "legendary",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["legendary:true"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen1",
    description: "Display generation 1",
    condition: {
      pattern: "gen1",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:1"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen2",
    description: "Display generation 2",
    condition: {
      pattern: "gen2",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:2"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen3",
    description: "Display generation 3",
    condition: {
      pattern: "gen3",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:3"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen4",
    description: "Display generation 4",
    condition: {
      pattern: "gen4",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:4"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen5",
    description: "Display generation 5",
    condition: {
      pattern: "gen5",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:5"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen6",
    description: "Display generation 6",
    condition: {
      pattern: "gen6",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:6"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen7",
    description: "Display generation 7",
    condition: {
      pattern: "gen7",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:7"],
        query: "",
      },
      filterPromotes: true,
    },
  },
  {
    objectID: "gen8",
    description: "Display generation 8",
    condition: {
      pattern: "gen8",
      anchoring: "contains",
      alternatives: true,
    },
    consequence: {
      params: {
        facetFilters: ["generation:8"],
        query: "",
      },
      filterPromotes: true,
    },
  },
];

async function saveRules() {
  for (const rule of rules) {
    await mainIndex.saveRule(rule, {
      forwardToReplicas: mainIndex.indexName.startsWith("dev_") === false,
    });
  }
}

module.exports = {
  saveRules,
};
