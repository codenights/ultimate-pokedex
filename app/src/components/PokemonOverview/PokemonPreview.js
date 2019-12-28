import React from "react";
import Link from "next/link";

import { useShiny } from "../ShinyMode";

export const PokemonPreview = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.spriteUrl, pokemon.spriteShinyUrl);

  return (
    <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemon.id}`}>
      <a>
        <style jsx>{`
          a {
            display: inline-block;
            padding: 20px;
            text-align: center;
            color: inherit;
            text-decoration: none;
          }

          img {
            max-width: 100px;
          }
        `}</style>

        <img src={spriteUrl} />
        <p>{pokemon.names.en}</p>
      </a>
    </Link>
  );
};
