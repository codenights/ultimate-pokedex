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

  type PokemonEvolution {
    # method
    pokemon: Pokemon!
  }

  type PokemonFamily {
    pokemon: Pokemon!
  }

  type Pokemon {
    id: String!
    name: String!
    spriteUrl: String!
    artworkUrl: String!
    weight: Int!
    height: Int!
    stats: PokemonStat!
    types: [Type!]!
    evolutions: [PokemonEvolution!]!
    family: PokemonFamily!
  }

  type Query {
    pokemon(nationalId: String!): Pokemon!
  }
`;
