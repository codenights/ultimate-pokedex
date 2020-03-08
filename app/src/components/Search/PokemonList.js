import React from "react";
import {
  connectInfiniteHits,
  connectStateResults,
} from "react-instantsearch-dom";

import { useIntersectionObserver } from "../hooks";
import { PokemonHit } from "./PokemonHit";
import { Title } from "../../ui";

const NoResults = connectStateResults(props => {
  return (
    <div className="py-8 px-4 text-gray-300">
      <Title>No Pokemon found</Title>

      {props.searchState.refinementList ? (
        <p>Try removing filters to find more Pokemon.</p>
      ) : (
        <p>Can‘t remember its name? Try searching for its color or shape.</p>
      )}
    </div>
  );
});

export const PokemonList = connectInfiniteHits(
  ({ hits: pokemons, hasMore, refineNext }) => {
    const loadMore = React.useCallback(
      function loadMore() {
        if (typeof window !== "undefined" && window.scrollY > 0) {
          refineNext();
        }
      },
      [refineNext]
    );

    const { setObservedNode } = useIntersectionObserver({
      callback: loadMore,
      threshold: 0,
    });

    if (pokemons.length === 0) {
      return <NoResults />;
    }

    return (
      <div>
        <div className="flex flex-wrap p-4 pl-0 pb-16">
          {pokemons.map(pokemon => (
            <PokemonHit key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>

        <div className="flex justify-center text-center mb-10">
          {hasMore ? (
            <button
              className="load-more rounded-full text-gray-400 py-2 px-4"
              onClick={() => refineNext()}
              ref={node => {
                setObservedNode(node);
              }}
            >
              Load more Pokemon
            </button>
          ) : (
            pokemons.length > 0 && (
              <div className="end-of-results text-gray-600">
                {pokemons.length} Pokemon shown
              </div>
            )
          )}
        </div>

        <style jsx>{`
          .load-more {
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: linear-gradient(
              40deg,
              rgba(255, 255, 255, 0.16),
              rgba(255, 255, 255, 0.1)
            );
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
              inset 1px 1px 1px rgba(255, 255, 255, 0.1);
          }

          .load-more:hover,
          .load-more:focus {
            outline: none;
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
              inset 1px 1px 1px rgba(255, 255, 255, 0.1),
              inset 0 0 2px 0 rgba(255, 255, 255, 0.2),
              inset 0 0 10px rgba(255, 255, 255, 0.2);
          }

          .end-of-results::after {
            content: "";
            display: block;
            margin: auto;
            margin-top: 16px;
            height: 3px;
            width: 150px;
            border-radius: 8px;
            background: linear-gradient(
              40deg,
              rgba(255, 255, 255, 0.5),
              rgba(255, 255, 255, 0.24)
            );
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
              inset 1px 1px 1px rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </div>
    );
  }
);
