import Knex from "knex";
import { ApolloServer } from "apollo-server-micro";

import { PokemonMoveRepository } from "../../src/repository/pokemonMove";
import { PokedexEntryRepository } from "../../src/repository/pokedexEntry";
import { EvolutionRepository } from "../../src/repository/evolution";
import { PokemonAbilityRepository } from "../../src/repository/pokemonAbility";
import { VersionGroupRepository } from "../../src/repository/versionGroup";
import { VersionRepository } from "../../src/repository/version";
import { TypeRepository } from "../../src/repository/type";
import { PokemonRepository } from "../../src/repository/pokemon";
import { MoveRepository } from "../../src/repository/move";
import { EvolutionChainRepository } from "../../src/repository/evolutionChain";
import { EggGroupRepository } from "../../src/repository/eggGroup";
import { AbilityRepository } from "../../src/repository/ability";
import { typeDefs } from "../../src/graphql/typeDefs";
import { resolvers } from "../../src/graphql/resolvers";

const env = process.env.NODE_ENV || "development";
const knex = Knex(require("../../knexfile")[env]);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    abilityRepository: AbilityRepository(knex),
    pokemonAbilityRepository: PokemonAbilityRepository(knex),
    eggGroupRepository: EggGroupRepository(knex),
    evolutionChainRepository: EvolutionChainRepository(knex),
    moveRepository: MoveRepository(knex),
    pokemonRepository: PokemonRepository(knex),
    typeRepository: TypeRepository(knex),
    versionRepository: VersionRepository(knex),
    versionGroupRepository: VersionGroupRepository(knex),
    evolutionRepository: EvolutionRepository(knex),
    pokedexEntryRepository: PokedexEntryRepository(knex),
    pokemonMoveRepository: PokemonMoveRepository(knex)
  }),
  formatError: err => {
    console.error(err);
    return new Error("Internal server error.");
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
