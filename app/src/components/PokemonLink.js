import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export const PokemonLink = ({ pokemonId, children }) => {
  return (
    <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemonId}`}>
      <a>{children}</a>
    </Link>
  );
};

PokemonLink.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
