import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  ClearRefinements,
  Panel
} from "react-instantsearch-dom";

import { AppBarLayout } from "../src/components/AppBarLayout";
import {
  getStateFromUrl,
  getUrlFromState
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

        <Configure hitsPerPage={25} />

        <div className="flex w-h-screen overflow-y-auto scrolling-touch">
          <aside className="hidden fixed top-0 inset-x-0 pt-16 h-full z-90 w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-1/5 lg:block xl:w-1/6">
            <div className="fixed lg:w-1/5 xl:w-1/6 top-16 w-1/5 h-full overflow-y-auto scrolling-touch p-8">
              <div>
                <Panel
                  className="pb-12"
                  header={
                    <div>
                      <ClearRefinements
                        className="inline-block bg-gray-600 text-gray-900 text-sm px-2 rounded"
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
                  className="pb-12"
                  header={
                    <div>
                      <ClearRefinements
                        className="inline-block bg-gray-600 text-gray-900 text-sm px-2 rounded"
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
              </div>
            </div>
          </aside>

          <main className="w-full h-full overflow-visible lg:w-4/5 xl:w-5/6 bg-gray-900">
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
      `}</style>
    </InstantSearch>
  );
}

export default Home;
