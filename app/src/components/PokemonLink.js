import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export const PokemonLink = ({ id, spriteUrl, names, children }) => {
  return (
    <Link href="/pokemon/[nationalId]" as={`/pokemon/${id}`}>
      <a className="flex items-center">
        <img className="w-10 mr-4" src={spriteUrl} alt={names.en} />
        <span>{names.en}</span>
        {children}
      </a>
    </Link>
  );
};
