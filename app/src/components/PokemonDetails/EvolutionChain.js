import React from "react";
import { Title } from "../../ui";
import { Section } from "./Section";
import { PokemonPreview } from "./PokemonPreview";

export const EvolutionChain = ({ activePokemon, evolutionList }) => {
  return (
    <Section>
    <Title>Evolutions</Title>
    <div className="flex justify-center">
      {evolutionList.map(pokemon => (
        <PokemonPreview
          key={pokemon.id}
          pokemon={pokemon}
          active={activePokemon.id === pokemon.id}
        />
      ))}
    </div>
    </Section>
  );
};
