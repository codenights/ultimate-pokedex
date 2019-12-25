import React from "react";
import { useShiny } from "../ShinyMode";

export const PokemonHeader = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.artworkUrl, pokemon.spriteShinyUrl);

  return (
    <header>
      <img alt={`${pokemon.names.en} sprite`} src={spriteUrl} />
      <h1>{pokemon.names.en}</h1>

      <style jsx>{`
        header {
          width: 100%;
          text-align: center;
        }

        img {
          width: 100%;
          max-width: 200px;
        }

        h1 {
          margin-top: 20px;
          position: relative;
          font-size: 3.5rem;
          line-height: 1;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 20px 0;
        }

        h1::before,
        h1::after {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          content: "";
          display: block;
          height: 2px;
          background: rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 150px;
        }

        h1::before {
          top: 0;
        }

        h1::after {
          bottom: 0;
        }
      `}</style>
    </header>
  );
};
