import React from "react";
import Head from "next/head";
import algoliasearch from "algoliasearch/lite";

import { Search } from "../components/Search/Search";

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search
        searchClient={searchClient}
        indexName={process.env.ALGOLIA_INDEX_NAME}
      />
    </div>
  );
}

export default Home;
