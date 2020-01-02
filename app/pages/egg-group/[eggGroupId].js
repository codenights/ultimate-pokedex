import React from "react";
import Error from "next/error";
import Link from "next/link";

import { executeQuery } from "../../src/queries/executeQuery";
import { fetchEggGroup } from "../../src/queries/fetchEggGroup";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { TypeBadge } from "../../src/components/TypeBadge";

const EggGroupPage = ({ eggGroup, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <div>
        <header>
          <h1>{eggGroup.name}</h1>
        </header>

        <main>
          <table>
            <thead>
            <tr>
              <td>#</td>
              <td>Pokemon</td>
              <td>Type(s)</td>
            </tr>
            </thead>

            <tbody>
            {eggGroup.pokemons.map(pokemon => (
              <tr key={pokemon.id}>
                <td># {pokemon.id}</td>

                <td>
                  <img src={pokemon.spriteUrl} alt={pokemon.names.en}/>

                  <Link
                    href="/pokemon/[nationalId]"
                    as={`/pokemon/${pokemon.id}`}
                  >
                    <a>{pokemon.names.en}</a>
                  </Link>
                </td>

                <td>
                  <ul>
                    {pokemon.types.map(type => (
                      <li key={type.id}>
                        <TypeBadge type={type}/>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </main>
      </div>

      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: 1fr 2fr;
        }
  
        header {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #76e;
        }
  
        h1 {
          font-size: 3.5rem;
          line-height: 1;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 20px 0;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-left-color: transparent;
          border-right-color: transparent;
        }
  
        main {
          box-sizing: border-box;
          height: 100%;
          overflow-y: auto;
          padding: 20px;
        }
  
        img {
          width: 50px;
          vertical-align: middle;
        }
  
        ul {
          display: inline-flex;
        }
  
        li + li {
          margin-left: 10px;
        }
  
        a {
          margin: 0 10px;
        }
  
        table {
          width: 100%;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #f1f1f1;
        }
  
        thead {
          background: #373737;
          color: #fff;
          font-weight: bold;
        }
  
        thead td {
          padding: 10px;
        }
  
        td {
          padding: 10px 10px;
        }
  
        tbody td {
          vertical-align: middle;
        }
  
        tbody tr:nth-child(even) {
          background: #fff;
        }
      `}</style>
    </AppBarLayout>
  );
};

EggGroupPage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchEggGroup(query.eggGroupId), req, ({ eggGroup }) => ({
    eggGroup
  }));

export default EggGroupPage;
