import React from "react";

import { EvolutionChain } from "./EvolutionChain";
import { PokemonHeader } from "./PokemonHeader";
import { Types } from "./Types";

const pokemonHasEvolution = pokemon =>
  pokemon.family.pokemon.evolutions.length > 0;

function getEvolutionList(pokemon) {
  function getEvolutionListRec(pokemon) {
    if (!pokemon.evolutions) {
      return pokemon;
    }

    return [pokemon].concat(
      ...pokemon.evolutions.map(evolution =>
        getEvolutionListRec(evolution.pokemon)
      )
    );
  }

  return getEvolutionListRec(pokemon);
}

export const PokemonOverview = ({ pokemon }) => (
  <section className="hidden top-0 inset-x-0 pt-16 bg-gray-800 h-auto z-90 w-full lg:overflow-y-visible lg:pt-0 lg:w-2/5 lg:block xl:w-2/6 flex text-center">
    <PokemonHeader pokemon={pokemon} />

    <Types types={pokemon.types} />

    {pokemonHasEvolution(pokemon) && (
      <EvolutionChain
        activePokemon={pokemon}
        evolutionList={getEvolutionList(pokemon.family.pokemon)}
      />
    )}
  </section>
);
