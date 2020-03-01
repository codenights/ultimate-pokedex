import React from "react";

import { PokemonPreview } from "./PokemonPreview";

export const EvolutionChain = ({ activePokemon, evolutionList }) => {
  return (
    <div className="flex justify-center">
      {evolutionList.map(pokemon => (
        <PokemonPreview
          key={pokemon.id}
          pokemon={pokemon}
          active={activePokemon.id === pokemon.id}
        />
      ))}
    </div>
  );
};
