const { findAbilityById, findAllAbilities } = require("../repository/ability");
const { findPokemonById, findAllPokemons } = require("../repository/pokemon");
const { AbilityPokemonResolver } = require("./resolvers/abilityPokemon");
const { VersionGroupResolver } = require("./resolvers/versionGroup");
const { PokemonMoveLearnResolver } = require("./resolvers/pokemonMoveLearn");
const { MoveResolver } = require("./resolvers/move");
const { PokemonMoveResolver } = require("./resolvers/pokemonMove");
const { TypeResolver } = require("./resolvers/type");
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
    pokemons: () => findAllPokemons(),
    pokemon: (obj, { nationalId }) => findPokemonById(nationalId),
    abilities: () => findAllAbilities(),
    ability: (obj, { id }) => findAbilityById(id)
  },
  Pokemon: PokemonResolver,
  PokemonPokedexEntry: PokemonPokedexEntryResolver,
  PokemonStat: PokemonStatsResolver,
  PokemonAbility: PokemonAbilityResolver,
  Version: VersionResolver,
  Ability: AbilityResolver,
  Type: TypeResolver,
  PokemonMove: PokemonMoveResolver,
  Move: MoveResolver,
  PokemonMoveLearn: PokemonMoveLearnResolver,
  VersionGroup: VersionGroupResolver,
  AbilityPokemon: AbilityPokemonResolver
};
