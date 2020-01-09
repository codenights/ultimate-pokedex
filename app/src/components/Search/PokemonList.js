import React from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";

import { useIntersectionObserver } from "../hooks";
import { PokemonHit } from "./PokemonHit";

export const PokemonList = connectInfiniteHits(
  ({ hits: pokemons, hasMore, refineNext }) => {
    const { setObservedNode } = useIntersectionObserver({
      callback: loadMore,
      threshold: 0
    });

    function loadMore() {
      if (typeof window !== "undefined" && window.scrollY > 0) {
        refineNext();
      }
    }

    return (
      <div>
        <div className="flex flex-wrap p-4 pl-0 pb-16">
          {pokemons.map(pokemon => (
            <PokemonHit key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        {hasMore && (
          <div
            ref={node => {
              setObservedNode(node);
            }}
          />
        )}
      </div>
    );
  }
);
