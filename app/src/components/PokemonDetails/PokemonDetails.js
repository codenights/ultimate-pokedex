import React from "react";
import { Stats } from "./Stats";
import { Abilities } from "./Abilities";
import { Moves } from "./Moves";
import { GeneralInfo } from "./GeneralInfo";
import { AlternateForms } from "./AlternateForms";
import { EvolutionChain } from "./EvolutionChain";
import { PokemonHeader } from "./PokemonHeader";

const pokemonHasEvolution = pokemon =>
  pokemon.family.pokemon.evolutions.length > 0;

function getEvolutionList(pokemon) {
  function getEvolutionListRec(nextPokemon) {
    if (!nextPokemon.evolutions || nextPokemon.evolutions.length === 0) {
      return [];
    }

    const evolution = nextPokemon.evolutions.map(
      evolution => evolution.pokemon
    );

    return [...evolution].concat(getEvolutionListRec(evolution));
  }

  return [pokemon].concat(getEvolutionListRec(pokemon));
}

export const PokemonDetails = ({ pokemon }) => (
  <div className="text-gray-600  pt-4 pb-24">
    <div className="flex">
      <PokemonHeader pokemon={pokemon} />
      <div className="w-6/12">
        <GeneralInfo pokemon={pokemon} />
        {pokemonHasEvolution(pokemon) && (
          <EvolutionChain
            activePokemon={pokemon}
            evolutionList={getEvolutionList(pokemon.family.pokemon)}
          />
        )}
      </div>
    </div>
    <Stats pokemon={pokemon} />
    <Abilities pokemon={pokemon} />
    <Moves pokemon={pokemon} />
    <AlternateForms pokemon={pokemon} />
    {/* <PokedexEntries pokemon={pokemon} /> */}
  </div>
);
