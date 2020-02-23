// language=GraphQL
export const fetchTypeQuery = typeId => `
  {
    type(id: ${Number(typeId)}) {
      id
      name
      color
    }
  }
`;
