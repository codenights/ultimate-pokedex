const { mainIndex } = require("./algoliaIndices");

const indexSettings = {
  // Relevance essentials
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
  ranking: [
    "asc(id)",
    "typo",
    "geo",
    "words",
    "filters",
    "proximity",
    "attribute",
    "exact",
  ],
  // Relevance optimizations
  disableTypoToleranceOnAttributes: [
    "objectID",
    "nameTokens.en",
    "nameTokens.fr",
    "nameTokens.ja",
    "color",
    "shape",
  ],
  // Filtering and faceting
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
  // Pagination and display
  attributesToHighlight: ["names.en", "names.fr", "names.ja"],
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>",
};

async function setSettings() {
  await mainIndex.setSettings(indexSettings, {
    forwardToReplicas: mainIndex.indexName.startsWith("dev_") === false,
  });
}

module.exports = {
  setSettings,
};
