import React from "react";
import Error from "next/error";
import Head from "next/head";

import { executeQuery } from "../../src/queries/executeQuery";
import { fetchEggGroup } from "../../src/queries/fetchEggGroup";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { TypeBadge } from "../../src/components/TypeBadge";
import { PokemonLink } from "../../src/components/PokemonLink";
import {
  ColumnLayout,
  LeftPane,
  LeftPaneTitle,
} from "../../src/components/ColumnLayout/ColumnLayout";

const EggGroupPage = ({ eggGroup, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <Head>
        <title>{eggGroup.name} | Ultimate Pokedex</title>
      </Head>

      <main>
        <ColumnLayout>
          <LeftPane>
            <LeftPaneTitle>{eggGroup.name}</LeftPaneTitle>
          </LeftPane>

          <div className="px-8 h-full overflow-y-auto border-box text-gray-400">
            <section className="py-8">
              <table className="table-auto w-full">
                <thead>
                  <tr className="border-b-2 border-gray-700">
                    <th className="p-4 font-bold">#</th>
                    <th className="p-4 font-bold">Pokemon</th>
                    <th className="p-4 font-bold">Types</th>
                  </tr>
                </thead>

                <tbody>
                  {eggGroup.pokemons.map(pokemon => (
                    <tr key={pokemon.id} className="border-b border-gray-700">
                      <td className="py-2 px-2">{pokemon.id}</td>

                      <td className="py-2 px-2">
                        <PokemonLink
                          id={pokemon.id}
                          names={pokemon.names}
                          types={pokemon.types}
                          spriteUrl={pokemon.spriteUrl}
                        />
                      </td>

                      <td className="py-2 px-2">
                        <ul className="inline-flex">
                          {pokemon.types.map(type => (
                            <li key={type.id} className="mr-4 last:mr-0">
                              <TypeBadge type={type} />
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </ColumnLayout>
      </main>
    </AppBarLayout>
  );
};

EggGroupPage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchEggGroup(query.eggGroupId), req, ({ eggGroup }) => ({
    eggGroup,
  }));

export default EggGroupPage;
