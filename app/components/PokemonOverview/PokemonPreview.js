import React from "react";
import Link from "next/link";

export const PokemonPreview = ({ pokemon }) => (
  <Link href={`/pokemon/${pokemon.id}`}>
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

      <img src={pokemon.spriteUrl} />
      <p>{pokemon.name}</p>
    </a>
  </Link>
);
