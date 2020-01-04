import React from "react";
import { useShiny } from "../ShinyMode";

export const PokemonHeader = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.artworkUrl, pokemon.spriteShinyUrl);

  return (
    <header>
      <img className="mx-auto" alt={`${pokemon.names.en} sprite`} src={spriteUrl} />
      <span className="text-3xl">{pokemon.names.en}</span>
    </header>
  );
};
