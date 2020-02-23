// language=GraphQL
export const fetchTypeQuery = typeId => `
  {
    type(id: ${Number(typeId)}) {
      id
      name
      color
      damagesFrom {
        type {
          id
          name
        }
        multiplier
      }
      damagesTo {
        type {
          id
          name
        }
        multiplier
      }
      pokemons {
        id
        names {
          en
        }
        spriteUrl
        types {
          color
          id
          name
        }
      }
    }
  }
`;
