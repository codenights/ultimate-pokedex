import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  Panel,
  SortBy,
} from "react-instantsearch-dom";
import { findResultsState } from "react-instantsearch-dom/server";

import { AppBarLayout } from "../src/components/AppBarLayout";
import {
  getStateFromUrl,
  getUrlFromState,
} from "../src/components/Search/router";
import { TypeList } from "../src/components/Search/TypeList";
import { RangeSlider } from "../src/components/Search/RangeSlider";
import { PokemonList } from "../src/components/Search/PokemonList";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

function getTypeAttribute(value) {
  switch (value) {
    case "weak":
      return "weakTo.name";
    case "resistant":
      return "resistantTo.name";
    default:
      return "types.name";
  }
}

function Home({ searchState: initialSearchState, resultsState, indexName }) {
  const router = useRouter();

  const [searchState, setSearchState] = React.useState(initialSearchState);
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
    <Search
      searchClient={searchClient}
      indexName={indexName}
      searchState={searchState}
      resultsState={resultsState}
      onSearchStateChange={onSearchStateChange}
      setSearchState={setSearchState}
    />
  );
}

function Search({
  searchClient,
  searchState,
  resultsState,
  indexName,
  onSearchStateChange,
  onSearchParameters,
  setSearchState,
}) {
  const initialTypeAttribute = getTypeAttribute();
  const [typeAttribute, setTypeAttribute] = React.useState(
    initialTypeAttribute
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      searchState={searchState}
      resultsState={resultsState}
      createURL={getUrlFromState}
      onSearchStateChange={onSearchStateChange}
      // `onSearchParameters` is passed by `findResultsState` when Server-Side
      // Rendering.
      onSearchParameters={onSearchParameters}
    >
      <AppBarLayout showSearchBox={true}>
        <Head>
          <title>Ultimate Pokedex | Home</title>
        </Head>

        <Configure hitsPerPage={20} filters="isDefaultForm:true" />

        <div className="flex w-h-screen overflow-y-auto scrolling-touch">
          <aside
            className="hidden fixed top-0 inset-x-0 pt-16 h-full z-90 lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:block"
            style={{ width: "400px" }}
          >
            <div
              className="fixed top-16 h-full overflow-y-auto scrolling-touch py-8 px-6"
              style={{ width: "300px" }}
            >
              <div>
                <Panel
                  className="pb-12"
                  header={
                    <div className="flex justify-between items-center mb-1">
                      <h2 className="text-gray-500 uppercase tracking-wider text-sm">
                        Types
                      </h2>

                      {/* <div className="select-container">
                        <select
                          onChange={event => {
                            setTypeAttribute(
                              getTypeAttribute(event.target.value)
                            );

                            setSearchState(searchState => ({
                              ...searchState,
                              // If user scrolls to page `x` and then changes
                              // the value of the select element, the results
                              // will be displayed from page `x`.
                              // We therefore need to reset the page value.
                              page: 1,
                            }));
                          }}
                        >
                          <option value="default">Pokemon type</option>
                          <option value="weak">Weak to</option>
                          <option value="resistant">Resistant to</option>
                        </select>
                      </div> */}
                    </div>
                  }
                >
                  <TypeList
                    attribute={typeAttribute}
                    operator="and"
                    limit={18}
                  />
                </Panel>

                <Panel
                  className="pb-12"
                  header={
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-gray-500 uppercase tracking-wider text-sm">
                        Stats
                      </h2>
                    </div>
                  }
                >
                  <div className="flex flex-fill text-gray-600 text-sm items-center whitespace-no-wrap mb-1">
                    <span className="w-16">HP</span>
                    <RangeSlider attribute="stats.hp" />
                  </div>
                  <div className="flex flex-fill text-gray-600 text-sm items-center whitespace-no-wrap mb-1">
                    <span className="w-16">Atk</span>
                    <RangeSlider attribute="stats.attack" />
                  </div>
                  <div className="flex flex-fill text-gray-600 text-sm items-center whitespace-no-wrap mb-1">
                    <span className="w-16">Def</span>
                    <RangeSlider attribute="stats.defense" />
                  </div>
                  <div className="flex flex-fill text-gray-600 text-sm items-center whitespace-no-wrap mb-1">
                    <span className="w-16">S-Atk</span>
                    <RangeSlider attribute="stats.specialAttack" />
                  </div>
                  <div className="flex flex-fill text-gray-600 text-sm items-center whitespace-no-wrap mb-1">
                    <span className="w-16">S-Def</span>
                    <RangeSlider attribute="stats.specialDefense" />
                  </div>
                  <div className="flex flex-fill text-gray-600 text-sm items-center whitespace-no-wrap mb-1">
                    <span className="w-16">Speed</span>
                    <RangeSlider attribute="stats.speed" />
                  </div>
                </Panel>

                <Panel
                  className="pb-12"
                  header={
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-gray-500 uppercase tracking-wider text-sm">
                        Sort by
                      </h2>
                    </div>
                  }
                >
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
                        value: process.env.ALGOLIA_INDEX_NAME_NAME_ASC,
                        label: "Name asc. ↑",
                      },
                      {
                        value: process.env.ALGOLIA_INDEX_NAME_NAME_DESC,
                        label: "Name desc. ↓",
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
                </Panel>
              </div>
            </div>
          </aside>

          <main className="w-full h-full overflow-visible bg-gray-900">
            <PokemonList />
          </main>
        </div>
      </AppBarLayout>
    </InstantSearch>
  );
}

Home.getInitialProps = async ({ asPath }) => {
  const searchState = getStateFromUrl(asPath);
  const indexName = searchState.sortBy || process.env.ALGOLIA_INDEX_NAME;
  const resultsState = await findResultsState(Search, {
    searchClient,
    searchState,
    indexName,
  });

  return {
    searchState,
    resultsState,
    indexName,
  };
};

export default Home;
