import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  ClearRefinements,
  Panel,
  RangeInput,
  RefinementList,
  SortBy,
} from "react-instantsearch-dom";

import { AppBarLayout } from "../src/components/AppBarLayout";
import { Icons } from "../src/components/Icons";
import {
  getStateFromUrl,
  getUrlFromState,
} from "../src/components/Search/router";
import { TypeList } from "../src/components/Search/TypeList";
import { RangeSlider } from "../src/components/Search/RangeSlider";
import { PokemonList } from "../src/components/Search/PokemonList";
import "../styles/main.css";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

function Home() {
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

      return true;
    });
  }, []);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.ALGOLIA_INDEX_NAME}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={getUrlFromState}
    >
      <AppBarLayout showSearchBox={true}>
        <Head>
          <title>Ultimate Pokedex | Home</title>
        </Head>

        <Configure hitsPerPage={40} />

        <div className="flex w-h-screen overflow-y-auto scrolling-touch">
          <aside className="hidden fixed top-0 inset-x-0 pt-16 h-full z-90 w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-1/5 lg:block xl:w-1/6">
            <div className="fixed lg:w-1/5 xl:w-1/6 top-16 w-1/5 h-full overflow-y-auto scrolling-touch p-8">
              <div>
                <Panel
                  className="pb-12"
                  header={
                    <div className="flex justify-between mb-2">
                      <h2 className="text-gray-400 uppercase tracking-wider text-sm">
                        Types
                      </h2>

                      <ClearRefinements
                        transformItems={items =>
                          items.filter(({ attribute }) =>
                            attribute.startsWith("types.")
                          )
                        }
                        translations={{
                          reset: (
                            <Icons
                              icon="restore"
                              className="text-white fill-current"
                            />
                          ),
                        }}
                      />
                    </div>
                  }
                >
                  <TypeList attribute="types.name" operator="and" limit={18} />
                </Panel>

                <Panel
                  className="pb-12"
                  header={
                    <div className="flex justify-between mb-2">
                      <h2 className="text-gray-400 uppercase tracking-wider text-sm">
                        Stats
                      </h2>

                      <ClearRefinements
                        transformItems={items =>
                          items.filter(({ attribute }) =>
                            attribute.startsWith("stats.")
                          )
                        }
                        translations={{
                          reset: (
                            <Icons
                              icon="restore"
                              className="text-white fill-current"
                            />
                          ),
                        }}
                      />
                    </div>
                  }
                >
                  <div className="tag flex flex-fill text-gray-400 text-sm items-center rounded-full px-4 mb-2 whitespace-no-wrap">
                    <span className="w-16">HP</span>
                    <RangeSlider attribute="stats.hp" />
                  </div>
                  <div className="tag flex flex-fill text-gray-400 text-sm items-center rounded-full px-4 mb-2 whitespace-no-wrap">
                    <span className="w-16">Atk</span>
                    <RangeSlider attribute="stats.attack" />
                  </div>
                  <div className="tag flex flex-fill text-gray-400 text-sm items-center rounded-full px-4 mb-2 whitespace-no-wrap">
                    <span className="w-16">Def</span>
                    <RangeSlider attribute="stats.defense" />
                  </div>
                  <div className="tag flex flex-fill text-gray-400 text-sm items-center rounded-full px-4 mb-2 whitespace-no-wrap">
                    <span className="w-16">S-Atk</span>
                    <RangeSlider attribute="stats.specialAttack" />
                  </div>
                  <div className="tag flex flex-fill text-gray-400 text-sm items-center rounded-full px-4 mb-2 whitespace-no-wrap">
                    <span className="w-16">S-Def</span>
                    <RangeSlider attribute="stats.specialDefense" />
                  </div>
                  <div className="tag flex flex-fill text-gray-400 text-sm items-center rounded-full px-4 mb-2 whitespace-no-wrap">
                    <span className="w-16">Speed</span>
                    <RangeSlider attribute="stats.speed" />
                  </div>
                </Panel>

                <Panel
                  className="pb-12"
                  header={
                    <div className="flex justify-between mb-2">
                      <h2 className="text-gray-400 uppercase tracking-wider text-sm">
                        Abilities
                      </h2>

                      <ClearRefinements
                        transformItems={items =>
                          items.filter(({ attribute }) =>
                            attribute.startsWith("abilities.")
                          )
                        }
                        translations={{
                          reset: (
                            <Icons
                              icon="restore"
                              className="text-white fill-current"
                            />
                          ),
                        }}
                      />
                    </div>
                  }
                >
                  <RefinementList
                    attribute="abilities.name"
                    searchable
                    showMore
                    translations={{
                      placeholder: "Search abilities",
                      noResults: "No abilities matching.",
                    }}
                  />
                </Panel>
              </div>
            </div>
          </aside>

          <main className="w-full h-full overflow-visible lg:w-4/5 xl:w-5/6 bg-gray-900">
            <div className="flex justify-between my-4 mx-4">
              <RangeInput
                attribute="id"
                translations={{
                  separator: " → ",
                }}
              />

              <SortBy
                defaultRefinement={process.env.ALGOLIA_INDEX_NAME}
                items={[
                  {
                    value: process.env.ALGOLIA_INDEX_NAME,
                    label: "Number asc. ↑",
                  },
                  {
                    value: process.env.ALGOLIA_INDEX_NAME_ID_DESC,
                    label: "Number desc. ↓",
                  },
                  {
                    value: process.env.ALGOLIA_INDEX_NAME_HEIGHT_ASC,
                    label: "Height asc. ↑",
                  },
                  {
                    value: process.env.ALGOLIA_INDEX_NAME_HEIGHT_DESC,
                    label: "Height desc. ↓",
                  },
                  {
                    value: process.env.ALGOLIA_INDEX_NAME_WEIGHT_ASC,
                    label: "Weight asc. ↑",
                  },
                  {
                    value: process.env.ALGOLIA_INDEX_NAME_WEIGHT_DESC,
                    label: "Weight desc. ↓",
                  },
                ]}
              />
            </div>

            <PokemonList />
          </main>
        </div>
      </AppBarLayout>

      <style global jsx>{`
        .tag {
          box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 1px rgba(255, 255, 255, 0.1);
          background-image: linear-gradient(
            -40deg,
            rgba(75, 79, 92, 0.3) 15%,
            rgba(0, 0, 0, 0.4) 90%
          );
        }

        .ais-RangeInput {
          color: #fff;
        }

        .ais-RangeInput-input {
          max-width: 62px;
        }

        .ais-RangeInput-submit {
          display: none;
        }

        .ais-SortBy-select,
        .ais-RangeInput-input,
        .ais-RefinementList-showMore {
          appearance: none;
          color: #fff;
          border-radius: 8px;
          min-height: 38px;
          padding: 8px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: linear-gradient(
            40deg,
            rgba(255, 255, 255, 0.24),
            rgba(255, 255, 255, 0.1)
          );
          box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 1px rgba(255, 255, 255, 0.1);
        }

        .ais-SortBy-select:focus,
        .ais-RangeInput-input:focus,
        .ais-RefinementList-showMore:hover,
        .ais-RefinementList-showMore:focus,
        .ais-RefinementList-showMore:active {
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 1px rgba(255, 255, 255, 0.1),
            inset 0 0 2px 0 rgba(255, 255, 255, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .ais-ClearRefinements-button {
          cursor: pointer;
        }

        .ais-ClearRefinements-button--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ais-RefinementList {
          color: #cbd5e0;
        }

        .ais-RefinementList-searchBox .ais-SearchBox {
          margin-bottom: 16px;
        }

        .ais-RefinementList-label {
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .ais-RefinementList-labelText {
          width: 100%;
        }

        .ais-RefinementList-count {
          color: #718096;
          font-size: 0.875rem;
        }

        .ais-RefinementList-checkbox {
          margin-right: 10px;
        }

        .ais-RefinementList-showMore {
          display: block;
          cursor: pointer;
          margin: 16px auto auto auto;
          background: none;
        }

        .ais-RefinementList-showMore--disabled {
          cursor: not-allowed;
        }

        .ais-Highlight-highlighted {
          font-style: normal;
          background-color: #718096;
          color: #fff;
        }
      `}</style>
    </InstantSearch>
  );
}

export default Home;
