const {
  mainIndex,
  idDescIndex,
  nameAscIndex,
  nameDescIndex,
  heightAscIndex,
  heightDescIndex,
  weightAscIndex,
  weightDescIndex,
} = require("./algoliaIndices");

const defaultRanking = [
  "typo",
  "geo",
  "words",
  "filters",
  "proximity",
  "attribute",
  "exact",
];

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
  ranking: ["asc(id)", ...defaultRanking],
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

  if (mainIndex.indexName.startsWith("dev_") === false) {
    await idDescIndex.setSettings({
      ranking: ["desc(id)", ...defaultRanking],
    });
    await nameAscIndex.setSettings({
      ranking: ["asc(names.en)", ...defaultRanking],
    });
    await nameDescIndex.setSettings({
      ranking: ["desc(names.en)", ...defaultRanking],
    });
    await heightAscIndex.setSettings({
      ranking: ["asc(height)", ...defaultRanking],
    });
    await heightDescIndex.setSettings({
      ranking: ["desc(height)", ...defaultRanking],
    });
    await weightAscIndex.setSettings({
      ranking: ["asc(weight)", ...defaultRanking],
    });
    await weightDescIndex.setSettings({
      ranking: ["desc(weight)", ...defaultRanking],
    });
  }
}

module.exports = {
  setSettings,
};
