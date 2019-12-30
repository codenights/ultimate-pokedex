import React, { useEffect } from "react";
import Head from "next/head";
import Error from "next/error";

import { fetchPokemonQuery } from "../../src/queries/fetchPokemon";
import { PokemonOverview } from "../../src/components/PokemonOverview/PokemonOverview";
import { PokemonDetails } from "../../src/components/PokemonDetails";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { executeQuery } from "../../src/queries/executeQuery";

const CANVAS_SIZE = 16;

const setFavicon = pokemon => {
  if (!process.browser || !pokemon) return;

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

const PokemonPage = ({ pokemon, statusCode }) => {
  useEffect(() => {
    setFavicon(pokemon);
  }, [pokemon]);

  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <main>
        <Head>
          <title>{pokemon.names.en} | Ultimate Pokedex</title>
        </Head>

        <PokemonOverview pokemon={pokemon} />

        <PokemonDetails pokemon={pokemon} />

        <style jsx>{`
          main {
            overflow-y: auto;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 20px;
          }

          @media (min-width: 800px) {
            main {
              overflow: hidden;
              grid-template-columns: 1fr 2fr;
            }
          }
        `}</style>
      </main>
    </AppBarLayout>
  );
};

PokemonPage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchPokemonQuery(query.nationalId), req, ({ pokemon }) => ({
    pokemon
  }));

export default PokemonPage;
