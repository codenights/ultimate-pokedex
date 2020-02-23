import React from "react";
import Link from "next/link";

import { useShiny } from "../ShinyMode";
import { PokemonLink } from "../PokemonLink";

export const PokemonPreview = ({ pokemon }) => {
  const spriteUrl = useShiny(pokemon.spriteUrl, pokemon.spriteShinyUrl);

  return (
    <div className="flex">
      <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemon.id}`}>
        <a>
          <img src={spriteUrl} />
          <span className="font-pokemon">{pokemon.names.en}</span>
        </a>
      </Link>
    </div>
  );
};
