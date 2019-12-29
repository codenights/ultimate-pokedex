import React from "react";
import Head from "next/head";
import algoliasearch from "algoliasearch/lite";

import { Search } from "../src/components/Search/Search";
import { AppBarLayout } from "../src/components/AppBarLayout";
import '../styles/main.css';

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

function Home() {
  return (
    <AppBarLayout>
      <Head>
        <title>Ultimate Pokedex | Home</title>gaa
      </Head>

      <Search
        searchClient={searchClient}
        indexName={process.env.ALGOLIA_INDEX_NAME}
      />
    </AppBarLayout>
  );
}

export default Home;
