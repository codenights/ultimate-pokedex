import React from "react";
import Link from "next/link";
import {
  InstantSearch,
  Highlight,
  SearchBox,
  connectInfiniteHits
} from "react-instantsearch-dom";

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

function Pokemon({ pokemon }) {
  return (
    <Link href={`pokemon/${pokemon.nationalId}`}>
      <a>
        <img width="50" src={pokemon.artworkUrl} alt={pokemon.name.en} />#
        {pokemon.nationalId} <Highlight attribute="name.en" hit={pokemon} />
        <div>
          <Highlight attribute="name.fr" hit={pokemon} /> <span>fr</span>
          {pokemon.name.ja && (
            <>
              {" "}
              / <Highlight attribute="name.ja" hit={pokemon} /> <span>ja</span>
            </>
          )}
        </div>
      </a>
    </Link>
  );
}

function useIntersectionObserver({ callback, root, rootMargin, threshold }) {
  const [node, setNode] = React.useState(null);
  const observer = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new window.IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold
    });

    if (node) {
      observer.current.observe(node);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [node, root, rootMargin, threshold]);

  return {
    setObservedNode: setNode
  };
}

const Hits = connectInfiniteHits(({ hits, hasMore, refineNext }) => {
  const { setObservedNode } = useIntersectionObserver({
    callback: refineNext,
    threshold: 0
  });
  const pokemons = preparePokemons(hits);

  return (
    <div>
      {pokemons.map(pokemon => (
        <Pokemon pokemon={pokemon} key={pokemon.nationalId} />
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
});

export function Search({ searchClient, indexName }) {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}
