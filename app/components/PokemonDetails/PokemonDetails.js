import React from "react";
import { PokedexEntries } from "./PokedexEntries";
import { Stats } from "./Stats";
import { Abilities } from "./Abilities";
import { Moves } from "./Moves";
import { GeneralInfo } from "./GeneralInfo";
import { AlternateForms } from "./AlternateForms";

export const PokemonDetails = ({ pokemon }) => (
  <div>
    <GeneralInfo pokemon={pokemon} />

    <AlternateForms pokemon={pokemon} />

    <Stats pokemon={pokemon} />

    <Abilities pokemon={pokemon} />

    <Moves pokemon={pokemon} />

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
