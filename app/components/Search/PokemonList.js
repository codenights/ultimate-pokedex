import React from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";

import { useIntersectionObserver } from "./hooks";
import { PokemonHit } from "./PokemonHit";

// Temporary function that formats Pokemons so we don't have to re-index Algolia
// records right now.
function preparePokemons(pokemons) {
  return pokemons.map(pokemon => {
    const spriteId = pokemon.objectID.toString().padStart(3, "0");

    return {
      ...pokemon,
      nationalId: pokemon.objectID,
      artworkUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`
    };
  });
}

export const PokemonList = connectInfiniteHits(
  ({ hits, hasMore, refineNext }) => {
    const { setObservedNode } = useIntersectionObserver({
      callback: refineNext,
      threshold: 0
    });
    const pokemons = preparePokemons(hits);

    return (
      <div>
        {pokemons.map(pokemon => (
          <PokemonHit pokemon={pokemon} key={pokemon.nationalId} />
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
