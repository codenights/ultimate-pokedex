const { gql } = require("apollo-server");

module.exports.typeDefs = gql`
  type Type {
    id: String!
    name: String!
  }

  type PokemonStat {
    hp: Int!
    attack: Int!
    defense: Int!
    specialAttack: Int!
    specialDefense: Int!
    speed: Int!
  }

  type Pokemon {
    id: String!
    name: String!
    spriteUrl: String!
    weight: Int!
    height: Int!
    stats: PokemonStat!
    types: [Type!]!
  }

  type Query {
    pokemon(nationalId: String!): Pokemon!
  }
`;
