import React from "react";
import qs from "qs";
import {
  InstantSearch,
  Panel,
  SearchBox,
  Configure,
  RangeInput,
  ClearRefinements
} from "react-instantsearch-dom";
import { useRouter } from "next/router";

import { TypeList } from "./TypeList";
import { PokemonList } from "./PokemonList";

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = searchState => {
  const { page, configure, ...searchStateToSync } = searchState;

  return searchStateToSync ? `/${createURL(searchStateToSync)}` : "";
};

export function Search({ searchClient, indexName }) {
  const router = useRouter();

  const [searchState, setSearchState] = React.useState(
    qs.parse(router.asPath.replace(/^\/?\?/g, ""))
  );
  const [debouncedSetState, setDebouncedSetState] = React.useState(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        router.push(searchStateToUrl(updatedSearchState));
      }, 400)
    );

    setSearchState(updatedSearchState);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}
    >
      <Configure hitsPerPage={50} />
      <div>
        <aside>
          <Panel
            header={
              <div>
                <h2>Types</h2>

                <ClearRefinements
                  transformItems={items =>
                    items.filter(({ attribute }) =>
                      attribute.startsWith("types.")
                    )
                  }
                  translations={{
                    reset: "Reset"
                  }}
                />
              </div>
            }
          >
            <TypeList attribute="types.name" operator="and" limit={18} />
          </Panel>

          <Panel
            header={
              <div>
                <h2>Stats</h2>

                <ClearRefinements
                  transformItems={items =>
                    items.filter(({ attribute }) =>
                      attribute.startsWith("stats.")
                    )
                  }
                  translations={{
                    reset: "Reset"
                  }}
                />
              </div>
            }
          >
            <p>HP</p>
            <RangeInput attribute="stats.hp" />

            <p>Attack</p>
            <RangeInput attribute="stats.attack" />

            <p>Defense</p>
            <RangeInput attribute="stats.defense" />

            <p>Special Attack</p>
            <RangeInput attribute="stats.specialAttack" />

            <p>Special Defense</p>
            <RangeInput attribute="stats.specialDefense" />

            <p>Speed</p>
            <RangeInput attribute="stats.speed" />
          </Panel>
        </aside>

        <main>
          <header>
            <SearchBox />
          </header>
          <PokemonList />
        </main>
      </div>

      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: auto 1fr;
        }

        aside {
          min-width: 250px;
          padding: 20px;
          background: #fff;
          border-right: 1px solid #ddd;
          min-height: 100vh;
          overflow-y: auto;
        }

        main {
          height: 100vh;
          overflow-y: auto;
        }

        header {
          padding: 10px;
          background: #fff;
          position: sticky;
          z-index: 2;
          top: 0;
          border-bottom: 1px solid #ddd;
        }
      `}</style>

      <style global jsx>{`
        .ais-SearchBox-form {
          display: grid;
          grid-template-columns: 1fr auto auto;
        }

        .ais-SearchBox-input {
          padding: 10px 20px;
          background: none;
          border: none;
          width: 100%;
          box-sizing: border-box;
          font: inherit;
          appearance: none;
        }

        .ais-SearchBox-input::-webkit-search-decoration,
        .ais-SearchBox-input::-webkit-search-cancel-button,
        .ais-SearchBox-input::-webkit-search-results-button,
        .ais-SearchBox-input::-webkit-search-results-decoration {
          display: none;
        }

        .ais-SearchBox-submit,
        .ais-SearchBox-reset {
          all: unset;
          font: inherit;
          padding: 10px;
        }

        .ais-SearchBox-reset[hidden] {
          display: none;
        }

        .ais-Panel-header h2 {
          text-transform: uppercase;
          font-size: 16px;
          color: #777;
          letter-spacing: 1px;
        }

        .ais-Panel-body {
          margin-bottom: 10px;
        }
      `}</style>
    </InstantSearch>
  );
}
