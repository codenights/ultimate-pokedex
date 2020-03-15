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
    "unordered(classification)",
    "unordered(color)",
    "unordered(shape)",
  ],
  attributesForFaceting: [
    "id",
    "searchable(types.name)",
    "searchable(weakTo.name)",
    "searchable(resistantTo.name)",
    "searchable(abilities.name)",
    "stats.hp",
    "stats.attack",
    "stats.defense",
    "stats.specialAttack",
    "stats.specialDefense",
    "stats.speed",
    "classification",
    "color",
    "shape",
    "genderRate",
    "captureRate",
    "generation",
    "starter",
    "fabulous",
    "baby",
    "legendary",
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
