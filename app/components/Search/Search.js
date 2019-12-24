import React from "react";
import {
  InstantSearch,
  Panel,
  RefinementList,
  SearchBox
} from "react-instantsearch-dom";

import { PokemonList } from "./PokemonList";

export function Search({ searchClient, indexName }) {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div>
        <aside>
          <Panel header={<h2>Filters</h2>}>
            <RefinementList attribute="types.name.en" operator="and" />
          </Panel>
        </aside>

        <main>
          <SearchBox />
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
        }

        main {
          height: 100vh;
          overflow-y: auto;
          padding: 20px;
        }
      `}</style>
    </InstantSearch>
  );
}
