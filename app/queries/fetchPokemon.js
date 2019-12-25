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
    name
    spriteUrl
  }

  {
    pokemon(nationalId: "${nationalId}") {
      id
      name
      artworkUrl
      spriteUrl
      weight
      height
      stats { ...Stats }
      
      types {
        id
        name
        color
      }
      
      pokedexEntries {
        version {
          id
          name
          color
        }
        entry
      }
      
      family {
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
      
      abilities {
        ability {
          id
          name
        }
        isHidden
      }

      moves {
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
    }
  }
`;
