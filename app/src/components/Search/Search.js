import React from "react";
import {
  InstantSearch,
  Panel,
  SearchBox,
  Configure,
  ClearRefinements
} from "react-instantsearch-dom";
import { useRouter } from "next/router";

import { TypeList } from "./TypeList";
import { PokemonList } from "./PokemonList";
import { RangeSlider } from "./RangeSlider";
import { getUrlFromState, getStateFromUrl } from "./router";

export function Search({ searchClient, indexName }) {
  const router = useRouter();
  const [searchState, setSearchState] = React.useState(
    getStateFromUrl(router.asPath)
  );
  const [debouncedSetState, setDebouncedSetState] = React.useState(null);
  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);
    setDebouncedSetState(
      setTimeout(() => {
        router.push(getUrlFromState(updatedSearchState));
      }, 400)
    );
    setSearchState(updatedSearchState);
  };
  React.useEffect(() => {
    router.beforePopState(({ url }) => {
      setSearchState(getStateFromUrl(url));
    });
  }, []);
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={getUrlFromState}
    >
      <Configure hitsPerPage={25} />
      <div className="flex w-h-screen overflow-y-auto scrolling-touch">
        <aside
        className="hidden fixed top-0 inset-x-0 pt-16 h-full z-90 w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-1/5 lg:block xl:w-1/6"
        >
          <div
            className="fixed top-16 h-full overflow-y-auto scrolling-touch p-8"
          >
            <div >
              <Panel
                className="pb-12"
                header={
                  <div>
                    <div className="inline-block text-gray-600 font-semibold uppercase text-xl mb-6">
                      Types
                    </div>
                    <ClearRefinements
                      className="inline-block bg-gray-900 text-gray-600 text-xl p-2 rounded ml-2"
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
                    <div className="inline-block text-gray-600 font-semibold uppercase text-xl mb-4">
                      Stats
                    </div>
                    <ClearRefinements
                      className="inline-block bg-gray-900 text-gray-600 text-xl p-2 rounded ml-2"
                      transformItems={items =>
                        items.filter(({ attribute }) =>
                          attribute.startsWith("stats.")
                        )
                      }
                      cssClasses={{
                        button: ["text-white", "bg-gray-900"]
                      }}
                      translations={{
                        reset: "Reset"
                      }}
                    />
                  </div>
                }
              >
                <div className="text-gray-400 text-md">HP</div>
                <RangeSlider attribute="stats.hp" />
                <div className="text-gray-400 text-xl">Attack</div>
                <RangeSlider attribute="stats.attack" />
                <div className="text-gray-400 text-xl">Defense</div>
                <RangeSlider attribute="stats.defense" />
                <div className="text-gray-400 text-xl">Special Attack</div>
                <RangeSlider attribute="stats.specialAttack" />
                <div className="text-gray-400 text-xl">Special Defense</div>
                <RangeSlider attribute="stats.specialDefense" />
                <div className="text-gray-400 text-xl">Speed</div>
                <RangeSlider attribute="stats.speed" />
              </Panel>
            </div>
          </div>
        </aside>
        <main className="w-full h-full overflow-visible lg:w-4/5 xl:w-5/6 bg-gray-900">
          <PokemonList />
        </main>
      </div>
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
        
      `}</style>
    </InstantSearch>
  );
}
