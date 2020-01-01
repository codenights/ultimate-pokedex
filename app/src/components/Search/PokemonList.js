import React from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";

import { useIntersectionObserver } from "../hooks";
import { PokemonHit } from "./PokemonHit";

export const PokemonList = connectInfiniteHits(
  ({ hits: pokemons, hasMore, refineNext }) => {
    const { setObservedNode } = useIntersectionObserver({
      callback: refineNext,
      threshold: 0
    });

    return (
      <div className="flex flex-wrap p-4">
        {pokemons.map(pokemon => (
          <PokemonHit key={pokemon.id} pokemon={pokemon} />
        ))}

        {hasMore && (
          <span
            ref={node => {
              setObservedNode(node);
            }}
          />
        )}
      </div>
    );
  }
);
