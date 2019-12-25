import React, { useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";

import { fetchPokemonQuery } from "../../queries/fetchPokemon";
import { PokemonOverview } from "../../components/PokemonOverview/PokemonOverview";
import { PokemonDetails } from "../../components/PokemonDetails";

const CANVAS_SIZE = 16;

const setFavicon = pokemon => {
  if (!process.browser) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = document.createElement("img");
  const favicon = document.getElementById("favicon");

  canvas.height = canvas.width = CANVAS_SIZE;

  img.onload = () => {
    ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    favicon.href = canvas.toDataURL("image/png");
  };

  img.crossOrigin = "Anonymous";
  img.src = pokemon.spriteUrl;
};

const PokemonPage = ({ pokemon }) => {
  useEffect(() => {
    setFavicon(pokemon);
  }, [pokemon]);

  return (
    <main>
      <Head>
        <title>{pokemon.name} | Ultimate Pokedex</title>

        <link rel="icon" id="favicon" type="image/x-icon" />
      </Head>

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
            grid-template-columns: 1fr 2fr;
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
