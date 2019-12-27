import { PokemonEvolutionResolver } from "./resolvers/pokemonEvolution";
import { EggGroupResolver } from "./resolvers/eggGroup";
import { PokemonPokedexEntryResolver } from "./resolvers/pokemonPokedexEntry";
import { AbilityPokemonResolver } from "./resolvers/abilityPokemon";
import { VersionGroupResolver } from "./resolvers/versionGroup";
import { PokemonMoveLearnResolver } from "./resolvers/pokemonMoveLearn";
import { MoveResolver } from "./resolvers/move";
import { PokemonMoveResolver } from "./resolvers/pokemonMove";
import { TypeResolver } from "./resolvers/type";
import { AbilityResolver } from "./resolvers/ability";
import { PokemonAbilityResolver } from "./resolvers/pokemonAbility";
import { VersionResolver } from "./resolvers/version";
import { PokemonResolver } from "./resolvers/pokemon";
import { PokemonStatsResolver } from "./resolvers/pokemonStats";

export const resolvers = {
  Query: {
    pokemons: (obj, args, { pokemonRepository }) =>
      pokemonRepository.findAllPokemons(),
    pokemon: (obj, { nationalId }, { pokemonRepository }) =>
      pokemonRepository.findPokemonById(nationalId),
    abilities: (obj, args, { abilityRepository }) =>
      abilityRepository.findAllAbilities(),
    ability: (obj, { id }, { abilityRepository }) =>
      abilityRepository.findAbilityById(id)
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
  AbilityPokemon: AbilityPokemonResolver,
  EggGroup: EggGroupResolver,
  PokemonEvolution: PokemonEvolutionResolver
};
