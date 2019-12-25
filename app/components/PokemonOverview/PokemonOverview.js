import React from "react";

import { getBackgroundColorFromType } from "../../utils/colors";
import { EvolutionChain } from "./EvolutionChain";
import { PokemonHeader } from "./PokemonHeader";
import { Types } from "./Types";

const pokemonHasEvolution = pokemon =>
  pokemon.family.pokemon.evolutions.length > 0;

export const PokemonOverview = ({ pokemon }) => (
  <section>
    <PokemonHeader pokemon={pokemon} />

    <Types types={pokemon.types} />

    {pokemonHasEvolution(pokemon) && (
      <EvolutionChain pokemon={pokemon.family.pokemon} />
    )}

    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: ${getBackgroundColorFromType(pokemon.types[0])};
      }
    `}</style>
  </section>
);
