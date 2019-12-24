import React from "react";
import { PokedexEntries } from "./PokedexEntries";
import { Stats } from "./Stats";
import { Abilities } from "./Abilities";

export const PokemonDetails = ({ pokemon }) => (
  <div>
    <Stats pokemon={pokemon} />

    <Abilities pokemon={pokemon} />

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
