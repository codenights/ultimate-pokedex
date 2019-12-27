// language=GraphQL
export const fetchMoveQuery = moveId => `
  {
    move(id: "${moveId}") {
      id
      name
      description
      accuracy
      pp
      power
      criticalRate
      drain
      healing
      flinchChance
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
