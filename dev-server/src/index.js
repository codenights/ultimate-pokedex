const express = require("express");
const { PokemonMoveRepository } = require("./repository/pokemonMove");
const { PokedexEntryRepository } = require("./repository/pokedexEntry");
const { ApolloServer } = require("apollo-server-express");

const knex = require("knex")(require("../knexfile").development);
const { EvolutionRepository } = require("./repository/evolution");
const { PokemonAbilityRepository } = require("./repository/pokemonAbility");
const { VersionGroupRepository } = require("./repository/versionGroup");
const { VersionRepository } = require("./repository/version");
const { TypeRepository } = require("./repository/type");
const { PokemonRepository } = require("./repository/pokemon");
const { MoveRepository } = require("./repository/move");
const { EvolutionChainRepository } = require("./repository/evolutionChain");
const { EggGroupRepository } = require("./repository/eggGroup");
const { AbilityRepository } = require("./repository/ability");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");

const app = express();
const server = new ApolloServer({
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
  })
});

app.head("/health", (req, res) => res.end());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000`);
});
