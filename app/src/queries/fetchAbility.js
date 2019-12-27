// language=GraphQL
export const fetchAbilityQuery = abilityId => `
  {
    ability(id: "${abilityId}") {
      id
      name
      description
      pokemons {
        isHidden
        pokemon {
          id
          names {
            en
          }
          spriteUrl
          types {
            id
            name
            color
          }
        }
      }
    }
  }
`;
