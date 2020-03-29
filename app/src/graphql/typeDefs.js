import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Type {
    id: Int!
    name: String!
    color: String!
    damagesFrom: [Damage!]!
    damagesTo: [Damage!]!
    pokemons: [Pokemon!]!
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
    id: Int!
    name: String!
    color: String!
  }

  type VersionGroup {
    id: Int!
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
    id: Int!
    name: String!
    description: String!
    pokemons: [AbilityPokemon!]!
  }

  type PokemonAbility {
    isHidden: Boolean!
    ability: Ability!
  }

  type Move {
    id: Int!
    accuracy: Int
    pp: Int!
    power: Int
    name: String!
    type: Type!
    damageClass: String!
    pokemons: [Pokemon!]!
    description: String!
    criticalRate: Int!
    drain: Int
    flinchChance: Int!
    healing: Int
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
    id: Int!
    name: String!
    pokemons: [Pokemon!]!
  }

  type Damage {
    type: Type!
    multiplier: Float!
  }

  type Color {
    id: Int!
    name: String!
  }

  type Shape {
    id: Int!
    name: String!
  }

  type Pokemon {
    id: Int!
    names: PokemonName
    spriteUrl: String!
    spriteShinyUrl: String!
    artworkUrl: String!
    isDefaultForm: Boolean!
    weight: Int!
    height: Int!
    baseHappiness: Int!
    captureRate: Int!
    eggGroups: [EggGroup!]!
    genderRate: Int!
    varieties: [Pokemon!]!
    stats: PokemonStat!
    classification: String!
    color: Color!
    shape: Shape!
    types: [Type!]!
    evolutions: [PokemonEvolution!]!
    family: PokemonFamily!
    pokedexEntries: [PokemonPokedexEntry!]!
    abilities: [PokemonAbility!]!
    moves: [PokemonMove!]!
    damagesFrom: [Damage!]!
  }

  type Query {
    pokemons: [Pokemon!]!
    pokemon(nationalId: Int!): Pokemon!

    abilities: [Ability!]!
    ability(id: Int!): Ability!

    move(id: Int!): Move!

    eggGroup(id: Int!): EggGroup!

    type(id: Int!): Type!

    color(id: Int!): Color!

    shape(id: Int!): Shape!
  }
`;
