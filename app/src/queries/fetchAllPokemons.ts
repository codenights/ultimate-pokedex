// language=GraphQL
export const fetchAllPokemonsQuery = () => `
  {
    pokemons {
      id
      names {
        en
      }
    }
  }
`;
