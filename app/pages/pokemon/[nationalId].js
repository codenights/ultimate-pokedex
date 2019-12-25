import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import { fetchPokemonQuery } from "../../queries/fetchPokemon";
import { PokemonOverview } from "../../components/PokemonOverview/PokemonOverview";
import { PokemonDetails } from "../../components/PokemonDetails";

const PokemonPage = ({ pokemon }) => {
  return (
    <main>
      <PokemonOverview pokemon={pokemon} />

      <PokemonDetails pokemon={pokemon} />

      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 20px;
        }

        @media (min-width: 800px) {
          main {
          overflow: hidden;
          height: 100vh;
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </main>
  );
};

PokemonPage.getInitialProps = async ({ query }) => {
  const { nationalId } = query;
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: fetchPokemonQuery(nationalId) })
  });
  const { data } = await response.json();

  return { pokemon: data.pokemon };
};

export default PokemonPage;
