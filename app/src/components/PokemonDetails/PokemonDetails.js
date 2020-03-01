import React from "react";
import { PokedexEntries } from "./PokedexEntries";
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
    const evolution = nextPokemon.evolutions[0].pokemon;
    return [evolution].concat(getEvolutionListRec(evolution));
  }
  return [pokemon].concat(getEvolutionListRec(pokemon));
}

export const PokemonDetails = ({ pokemon }) => (
  <div className="px-6 text-gray-600">

    <div className="flex">
      <PokemonHeader pokemon={pokemon} />
      <div>
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
    <Moves pokemon={pokemon} />
    <Abilities pokemon={pokemon} />
    <AlternateForms pokemon={pokemon} />
    <PokedexEntries pokemon={pokemon} />
  </div>
);
