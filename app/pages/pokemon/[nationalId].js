import React from "react";
import fetch from "isomorphic-unfetch";

const PokemonPage = props => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

PokemonPage.getInitialProps = async ({ query }) => {
  const { nationalId } = query;
  const graphqlQuery = `
  {
    pokemon(nationalId: "${nationalId}") {
      id
      name,
      spriteUrl
      weight
      height,
      stats {
        hp,
        attack,
        defense
        specialAttack
        specialDefense
        speed
      }
      types {
        id
        name
      }
    }
  }
  `;

  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: graphqlQuery })
  });
  const { data } = await response.json();

  return { pokemon: data.pokemon };
};

export default PokemonPage;
