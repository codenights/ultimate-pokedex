// language=GraphQL
export const fetchPokemonQuery = nationalId => `
  fragment Stats on PokemonStat {
    hp
    attack
    defense
    specialAttack
    specialDefense
    speed
  }

  fragment PokemonPreview on Pokemon {
    id
    names {
      en
    }
    spriteUrl
    spriteShinyUrl
  }
  
  fragment BaseInfo on Pokemon {
    id
    names {
      en
    }
    
    artworkUrl
    spriteUrl
    spriteShinyUrl
    
    weight
    height
    baseHappiness
    captureRate
    genderRate
    
    stats { ...Stats }
  }
  
  fragment Type on Type {
    id
    name
    color
  }
  
  fragment PokedexEntries on PokemonPokedexEntry {
    version {
      id
      name
      color
    }
    entry
  }
  
  fragment Family on PokemonFamily {
    pokemon {
      ...PokemonPreview
      evolutions {
        pokemon {
          ...PokemonPreview
          evolutions {
            pokemon {
              ...PokemonPreview
            }
          }
        }
      }
    }
  }
  
  fragment Abilities on PokemonAbility {
    ability {
      id
      name
    }
    isHidden
  }
  
  fragment Move on PokemonMove {
    move {
      id
      name
      accuracy
      pp
      power
      damageClass
      type {
        id
        name
        color
      }
    }
    learn {
      method
      level
      versionGroup {
        id
        name
      }
    }
  }
  
  fragment EggGroup on EggGroup {
    id
    name
  }
  
  fragment Varieties on Pokemon {
    id
    names {
      en
    }
    artworkUrl
  }

  {
    pokemon(nationalId: ${Number(nationalId)}) {
      ...BaseInfo
      
      types { ...Type }
      
      pokedexEntries { ...PokedexEntries }
      
      family { ... Family }
      
      abilities { ...Abilities }

      moves { ...Move }

      eggGroups { ...EggGroup }

      varieties { ...Varieties }
    }
  }
`;
