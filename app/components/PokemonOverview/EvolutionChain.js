import React from "react";

import { PokemonPreview } from "./PokemonPreview";

const Evolutions = ({ evolutions }) => (
  <div>
    {evolutions.map(({ pokemon }) => (
      <EvolutionChain key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

export const EvolutionChain = ({ pokemon }) => (
  <div>
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
      }
    `}</style>

    <PokemonPreview pokemon={pokemon} />

    {pokemon.evolutions && <Evolutions evolutions={pokemon.evolutions} />}
  </div>
);
