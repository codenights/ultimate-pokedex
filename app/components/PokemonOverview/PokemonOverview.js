import React from "react";
import { desaturate } from "polished";

import { EvolutionChain } from "./EvolutionChain";
import { PokemonHeader } from "./PokemonHeader";
import { Types } from "./Types";

export const PokemonOverview = ({ pokemon }) => (
  <section>
    <PokemonHeader name={pokemon.name} src={pokemon.artworkUrl} />

    <Types types={pokemon.types} />

    <EvolutionChain pokemon={pokemon.family.pokemon} />

    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: ${desaturate(0.5, pokemon.types[0].color)};
      }
    `}</style>
  </section>
);
