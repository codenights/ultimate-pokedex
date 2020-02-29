import React from "react";
import { PokedexEntries } from "./PokedexEntries";
import { Stats } from "./Stats";
import { Abilities } from "./Abilities";
import { Moves } from "./Moves";
import { GeneralInfo } from "./GeneralInfo";
import { AlternateForms } from "./AlternateForms";

export const PokemonDetails = ({ pokemon }) => (
  <div className="px-6 text-gray-600">
    <GeneralInfo pokemon={pokemon} />
    <Abilities pokemon={pokemon} />
    <AlternateForms pokemon={pokemon} />
    <Stats pokemon={pokemon} />
    <Moves pokemon={pokemon} />
    <PokedexEntries pokemon={pokemon} />
  </div>
);
