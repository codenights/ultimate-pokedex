import React from "react";

import { getBackgroundColorFromType } from "../../utils/colors";
import { EvolutionChain } from "./EvolutionChain";
import { PokemonHeader } from "./PokemonHeader";
import { Types } from "./Types";

const pokemonHasEvolution = pokemon =>
  pokemon.family.pokemon.evolutions.length > 0;

export const PokemonOverview = ({ pokemon }) => (
  <section className="hidden top-0 inset-x-0 pt-16 bg-gray-800 h-auto z-90 w-full lg:overflow-y-visible lg:pt-0 lg:w-2/5 lg:block xl:w-2/6 flex text-center">
    <PokemonHeader pokemon={pokemon} />

    <Types types={pokemon.types} />

    {pokemonHasEvolution(pokemon) && (
      <EvolutionChain pokemon={pokemon.family.pokemon} />
    )}
  </section>
);
