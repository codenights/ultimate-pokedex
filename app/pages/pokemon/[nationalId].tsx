import React, { useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import { executeQuery } from "../../src/queries/executeQuery";
import { fetchPokemonQuery } from "../../src/queries/fetchPokemon";
import { PokemonDetails } from "../../src/components/PokemonDetails";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { fetchAllPokemonsQuery } from "../../src/queries/fetchAllPokemons";

const CANVAS_SIZE = 16;

const PokemonPage = ({ pokemon }) => {
  useEffect(() => {
    if (!pokemon) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    const favicon = document.querySelector<HTMLLinkElement>("#favicon");

    canvas.height = canvas.width = CANVAS_SIZE;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      favicon.href = canvas.toDataURL("image/png");
    };

    img.crossOrigin = "Anonymous";
    img.src = pokemon.spriteUrl;
  }, [pokemon]);

  return (
    <AppBarLayout>
      <main className="flex w-h-screen overflow-y-auto scrolling-touch bg-black">
        <Head>
          <title>
            {pokemon.names.en} #{pokemon.id} | Ultimate Pokedex
          </title>
        </Head>

        <div className="mx-auto container font-body max-w-3xl p-8 bg-gray-900">
          <PokemonDetails pokemon={pokemon} />
        </div>
      </main>
    </AppBarLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { pokemon } = await executeQuery(
    fetchPokemonQuery(params.nationalId),
    null,
    ({ pokemon }) => ({ pokemon })
  );

  return {
    props: {
      pokemon,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { pokemons } = await executeQuery(
    fetchAllPokemonsQuery(),
    null,
    ({ pokemons }) => ({ pokemons })
  );
  const paths = pokemons.map(pokemon => `/pokemon/${pokemon.id}`);

  return {
    paths,
    fallback: false,
  };
};

export default PokemonPage;
