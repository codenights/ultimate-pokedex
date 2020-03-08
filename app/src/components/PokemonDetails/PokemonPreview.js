import React from "react";
import Link from "next/link";
import cx from "classnames";

import { useShiny } from "../ShinyMode";

export const PokemonPreview = ({ pokemon, active }) => {
  const spriteUrl = useShiny(pokemon.spriteUrl, pokemon.spriteShinyUrl);

  return (
    <div className={cx("px-4", { "text-white": active })}>
      <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemon.id}`}>
        <a className="flex flex-col text-center">
          <img
            src={spriteUrl}
            alt={`${pokemon.names.en} sprite`}
            width="80px"
          />
          <span className="font-pokemon">{pokemon.names.en}</span>
        </a>
      </Link>
    </div>
  );
};
