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
      <div>
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

        <style jsx>{`
          div {
            padding: 20px;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(3, 1fr);
          }
        `}</style>
      </div>
    );
  }
);
