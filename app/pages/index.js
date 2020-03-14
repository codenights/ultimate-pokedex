import React from "react";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch/lite";
import { findResultsState } from "react-instantsearch-dom/server";

import {
  Search,
  getStateFromUrl,
  getUrlFromState,
} from "../src/components/Search";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

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
