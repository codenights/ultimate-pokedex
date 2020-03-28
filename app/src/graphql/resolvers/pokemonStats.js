import * as R from "ramda";

export const PokemonStatsResolver = {
  hp: R.prop("stat_hp"),
  attack: R.prop("stat_attack"),
  defense: R.prop("stat_defense"),
  specialAttack: R.prop("stat_special_attack"),
  specialDefense: R.prop("stat_special_defense"),
  speed: R.prop("stat_speed"),
};
