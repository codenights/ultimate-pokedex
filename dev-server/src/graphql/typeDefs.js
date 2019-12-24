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
    pokemon: Pokemon!
  }

  type PokemonFamily {
    pokemon: Pokemon!
  }

  type Version {
    id: String!
    name: String!
  }

  type PokemonPokedexEntry {
    version: Version!
    entry: String!
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
    pokedexEntries: [PokemonPokedexEntry!]!
  }

  type Query {
    pokemon(nationalId: String!): Pokemon!
  }
`;
