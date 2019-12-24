import React from "react";
import { PokedexEntries } from "./PokedexEntries";

export const PokemonDetails = ({ pokemon }) => (
  <div>
    <PokedexEntries pokemon={pokemon} />

    <style jsx>{`
      div {
        box-sizing: border-box;
        padding: 20px;
        height: 100%;
        overflow-y: auto;
      }
    `}</style>
  </div>
);
