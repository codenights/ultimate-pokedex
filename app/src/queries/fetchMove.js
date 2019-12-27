// language=GraphQL
export const fetchMoveQuery = moveId => `
  {
    move(id: "${moveId}") {
      id
      name
      accuracy
      pp
      power
      type {
        id
        name
        color
      }
      damageClass
      pokemons {
        id
        names {
          fr
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
`;
