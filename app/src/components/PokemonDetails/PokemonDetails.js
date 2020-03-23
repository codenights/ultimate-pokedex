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

export const PokemonDetails = ({ pokemon }) => (
  <div className="text-gray-600 pt-4 pb-24">
    <div className="flex flex-col md:flex-row">
      <PokemonHeader pokemon={pokemon} />
      <div className="md:w-6/12">
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
