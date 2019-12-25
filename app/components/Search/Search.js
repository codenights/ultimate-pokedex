import React from "react";
import {
  InstantSearch,
  Panel,
  RefinementList,
  SearchBox,
  Configure,
  RangeInput,
  ClearRefinements
} from "react-instantsearch-dom";

import { PokemonList } from "./PokemonList";

export function Search({ searchClient, indexName }) {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure hitsPerPage={50} />
      <div>
        <aside>
          <ClearRefinements />

          <Panel header={<h2>Types</h2>}>
            <RefinementList
              attribute="types.name.en"
              operator="and"
              limit={18}
            />
          </Panel>

          <Panel header={<h2>Statistics</h2>}>
            <p>HP</p>
            <RangeInput attribute="stats.hp.base" />

            <p>Attack</p>
            <RangeInput attribute="stats.attack.base" />

            <p>Defense</p>
            <RangeInput attribute="stats.defense.base" />

            <p>Special Attack</p>
            <RangeInput attribute="stats.special_attack.base" />

            <p>Special Defense</p>
            <RangeInput attribute="stats.special_defense.base" />

            <p>Speed</p>
            <RangeInput attribute="stats.speed.base" />
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
        }

        .ais-SearchBox-submit,
        .ais-SearchBox-reset {
          all: unset;
          font: inherit;
          padding: 10px;
        }
      `}</style>
    </InstantSearch>
  );
}
