import React from "react";
import { PokedexEntries } from "./PokedexEntries";
import { Stats } from "./Stats";
import { Abilities } from "./Abilities";
import { Moves } from "./Moves";
import { GeneralInfo } from "./GeneralInfo";
import { AlternateForms } from "./AlternateForms";

export const PokemonDetails = ({ pokemon }) => (
  <div className="flex flex-wrap w-full px-6 text-gray-600">
    <div className="w-1/2">
      <GeneralInfo pokemon={pokemon} />
      <AlternateForms pokemon={pokemon} />
      <Abilities pokemon={pokemon} />
    </div>
    <div className="w-1/2">
      <Stats pokemon={pokemon} />
    </div>
    <div className="w-full">
      <Moves pokemon={pokemon} />
      <PokedexEntries pokemon={pokemon} />
    </div>
  </div>
);
