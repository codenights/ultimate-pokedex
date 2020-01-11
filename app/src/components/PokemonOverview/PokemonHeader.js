import React from "react";
import { useShiny } from "../ShinyMode";

export const PokemonHeader = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.artworkUrl, pokemon.spriteShinyUrl);

  return (
    <header>
      <img className="mx-auto" alt={`${pokemon.names.en} sprite`} src={spriteUrl} />
      <span className={`pokemon-name font-pokemon text-center text-2xl text-type-${pokemon.types[0].name.toLowerCase()}`}>{pokemon.names.en}</span>
    </header>
  );
};
