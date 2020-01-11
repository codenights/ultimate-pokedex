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

module.exports = {
  indexSettings,
};
