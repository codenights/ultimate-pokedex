const findStatByName = statName => allStats =>
  allStats.find(x => x.stat.name === statName).base_stat;

module.exports.PokemonStatsResolver = {
  hp: findStatByName("hp"),
  attack: findStatByName("attack"),
  defense: findStatByName("defense"),
  specialAttack: findStatByName("special-attack"),
  specialDefense: findStatByName("special-defense"),
  speed: findStatByName("speed")
};
