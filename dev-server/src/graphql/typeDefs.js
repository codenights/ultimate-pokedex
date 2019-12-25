const { gql } = require("apollo-server-express");

module.exports.typeDefs = gql`
  type Type {
    id: String!
    name: String!
    color: String!
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
    color: String!
  }

  type VersionGroup {
    id: String!
    name: String!
  }

  type PokemonPokedexEntry {
    version: Version!
    entry: String!
  }

  type Ability {
    id: String!
    name: String!
  }

  type PokemonAbility {
    isHidden: Boolean!
    ability: Ability!
  }

  type Move {
    id: String!
    accuracy: Int
    pp: Int!
    power: Int
    name: String!
    type: Type!
    damageClass: String!
  }

  type PokemonMoveLearn {
    versionGroup: VersionGroup!
    level: Int
    method: String!
  }

  type PokemonMove {
    move: Move!
    learn: [PokemonMoveLearn!]!
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
    abilities: [PokemonAbility!]!
    moves: [PokemonMove!]!
  }

  type Query {
    pokemon(nationalId: String!): Pokemon!
  }
`;
