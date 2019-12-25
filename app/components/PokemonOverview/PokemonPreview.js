import React from "react";

export const PokemonPreview = ({ pokemon, isShiny }) => (
  <a href={`/pokemon/${pokemon.id}`}>
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

    <img src={isShiny ? pokemon.spriteShinyUrl : pokemon.spriteUrl} />
    <p>{pokemon.names.en}</p>
  </a>
);
