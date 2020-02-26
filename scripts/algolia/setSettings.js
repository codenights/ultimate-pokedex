const { mainIndex } = require("./algoliaIndices");

const indexSettings = {
  searchableAttributes: [
    "names.en",
    "names.fr",
    "names.ja",
    "unordered(objectID)",
    "unordered(nameTokens.en)",
    "unordered(nameTokens.fr)",
    "unordered(nameTokens.ja)",
  ],
  attributesForFaceting: [
    "id",
    "isDefaultForm",
    "types.name",
    "weakTo.name",
    "resistantTo.name",
    "searchable(abilities.name)",
    "stats.hp",
    "stats.attack",
    "stats.defense",
    "stats.specialAttack",
    "stats.specialDefense",
    "stats.speed",
  ],
};

async function setSettings() {
  try {
    await mainIndex.setSettings(indexSettings, {
      forwardToReplicas: mainIndex.indexName.startsWith("dev_") === false,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  setSettings,
};
