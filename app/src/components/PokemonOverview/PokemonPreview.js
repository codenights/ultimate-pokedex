import React from "react";
import Link from "next/link";

import { useShiny } from "../ShinyMode";
import { PokemonLink } from "../PokemonLink";

export const PokemonPreview = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.spriteUrl, pokemon.spriteShinyUrl);

  return (
    <div>
      <PokemonLink pokemonId={pokemon.id}>
        <img src={spriteUrl} />
        <p>{pokemon.names.en}</p>
      </PokemonLink>

      <style jsx>{`
        div > :global(a) {
          display: inline-block;
          padding: 20px 10px;
          text-align: center;
          color: inherit;
          text-decoration: none;
        }

        img {
          max-width: 100px;
        }
      `}</style>
    </div>
  );
};
