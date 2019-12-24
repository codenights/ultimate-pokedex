const { findPokemonById } = require("../repository/pokemon");
const { AbilityResolver } = require("./resolvers/ability");
const { PokemonAbilityResolver } = require("./resolvers/pokemonAbility");
const { VersionResolver } = require("./resolvers/version");
const { PokemonResolver } = require("./resolvers/pokemon");
const { PokemonStatsResolver } = require("./resolvers/pokemonStats");
const {
  PokemonPokedexEntryResolver
} = require("./resolvers/pokemonPokedexEntry");

module.exports.resolvers = {
  Query: {
    pokemon: async (obj, { nationalId }, ctx) => findPokemonById(nationalId)
  },
  Pokemon: PokemonResolver,
  PokemonPokedexEntry: PokemonPokedexEntryResolver,
  PokemonStat: PokemonStatsResolver,
  PokemonAbility: PokemonAbilityResolver,
  Version: VersionResolver,
  Ability: AbilityResolver
};
