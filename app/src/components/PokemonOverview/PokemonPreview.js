import React from "react";
import Link from "next/link";
import cx from "classnames";

import { useShiny } from "../ShinyMode";

export const PokemonPreview = ({ pokemon, active }) => {
  const spriteUrl = useShiny(pokemon.spriteUrl, pokemon.spriteShinyUrl);

  return (
    <div className={cx("flex", { "text-white": active })}>
      <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemon.id}`}>
        <a>
          <img src={spriteUrl} />
          <span className="font-pokemon">{pokemon.names.en}</span>
        </a>
      </Link>
    </div>
  );
};
