// language=GraphQL
export const fetchEggGroup = eggGroupId => `
  {
    eggGroup(id: ${Number(eggGroupId)}) {
      id
      name
      pokemons {
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
`;
