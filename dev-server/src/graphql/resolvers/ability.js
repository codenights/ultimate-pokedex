module.exports.AbilityResolver = {
  name: ability => ability.names.find(x => x.language.name === "en").name,
  description: ability =>
    ability.effect_entries
      .find(x => x.language.name === "en")
      .effect.replace(/\n/g, " "),
  pokemons: ability => ability.pokemon
};
