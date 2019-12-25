import React from "react";

import { EvolutionChain } from "./EvolutionChain";
import { PokemonHeader } from "./PokemonHeader";
import { Types } from "./Types";
import { getBackgroundColorFromType } from "../../utils/colors";

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

        background: ${getBackgroundColorFromType(pokemon.types[0])};
      }
    `}</style>
  </section>
);
