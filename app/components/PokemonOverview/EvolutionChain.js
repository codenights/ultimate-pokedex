import React from "react";

import { PokemonPreview } from "./PokemonPreview";

const Evolutions = ({ evolutions, isShiny }) => (
  <div>
    {evolutions.map(({ pokemon }) => (
      <EvolutionChain key={pokemon.id} pokemon={pokemon} isShiny={isShiny} />
    ))}
  </div>
);

export const EvolutionChain = ({ pokemon, isShiny }) => (
  <div>
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
      }
    `}</style>

    <PokemonPreview pokemon={pokemon} isShiny={isShiny} />

    {pokemon.evolutions && (
      <Evolutions evolutions={pokemon.evolutions} isShiny={isShiny} />
    )}
  </div>
);
