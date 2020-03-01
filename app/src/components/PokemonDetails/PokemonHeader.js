import React from "react";
import { useShiny } from "../ShinyMode";
import { Types } from "./Types";

export const PokemonHeader = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.artworkUrl, pokemon.spriteShinyUrl);

  return (
    <header className="text-center w-6/12 pt-8">
      <img className="mx-auto" alt={`${pokemon.names.en} sprite`} width="200" src={spriteUrl} />
      <span className={`pokemon-name font-pokemon text-center text-4xl text-type-${pokemon.types[0].name.toLowerCase()}`}>{pokemon.names.en}</span>
      <Types types={pokemon.types} />
      <div className="pt-5 w-64 mx-auto text-justify">{pokemon.pokedexEntries[0].entry}</div>
    </header>
  );
};
