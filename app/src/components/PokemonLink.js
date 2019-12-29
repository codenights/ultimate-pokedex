import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Router } from "next/router";

export const PokemonLink = ({ pokemonId, children }) => {
  return (
    <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemonId}`}>
      <a>{children}</a>
    </Link>
  );
};
