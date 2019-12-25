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
          name
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
