import { gql } from "apollo-server-micro";

export const typeDefs = gql`
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

  type AbilityPokemon {
    isHidden: Boolean!
    pokemon: Pokemon!
  }

  type Ability {
    id: String!
    name: String!
    description: String!
    pokemons: [AbilityPokemon!]!
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
    pokemons: [Pokemon!]!
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

  type PokemonName {
    fr: String!
    en: String!
    ja: String
  }

  type EggGroup {
    id: String!
    name: String!
    pokemons: [Pokemon!]!
  }

  type Pokemon {
    id: String!
    names: PokemonName
    spriteUrl: String!
    spriteShinyUrl: String!
    artworkUrl: String!
    weight: Int!
    height: Int!
    baseHappiness: Int!
    captureRate: Int!
    eggGroups: [EggGroup!]!
    genderRate: Int!
    varieties: [Pokemon!]!
    stats: PokemonStat!
    types: [Type!]!
    evolutions: [PokemonEvolution!]!
    family: PokemonFamily!
    pokedexEntries: [PokemonPokedexEntry!]!
    abilities: [PokemonAbility!]!
    moves: [PokemonMove!]!
  }

  type Query {
    pokemons: [Pokemon!]!
    pokemon(nationalId: String!): Pokemon!

    abilities: [Ability!]!
    ability(id: String!): Ability!

    move(id: String!): Move!
  }
`;
