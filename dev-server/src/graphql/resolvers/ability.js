module.exports.AbilityResolver = {
  name: ability => ability.names.find(x => x.language.name === "en").name
};
