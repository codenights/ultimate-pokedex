import React from "react";
import fetch from "isomorphic-unfetch";

import { TypeBadge } from "../../components/TypeBadge";

const PokemonPage = ({ pokemon }) => {
  return (
    <main>
      <section>
        <div>
          <img alt={`${pokemon.name} sprite`} src={pokemon.spriteUrl} />
        </div>
        <h1>{pokemon.name}</h1>

        <ul>
          {pokemon.types.map(type => (
            <li>
              <TypeBadge type={type.name} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <pre>{JSON.stringify(pokemon, null, 2)}</pre>
      </section>

      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 20px;
          height: 100vh;
          overflow: hidden;
        }

        section:first-child {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        section:first-child ul {
          display: flex;
        }

        section:first-child li + li {
          margin-left: 8px;
        }

        h1 {
          font-size: 3rem;
        }
      `}</style>
    </main>
  );
};

PokemonPage.getInitialProps = async ({ query }) => {
  const { nationalId } = query;
  const graphqlQuery = `
  {
    pokemon(nationalId: "${nationalId}") {
      id
      name,
      spriteUrl
      weight
      height,
      stats {
        hp,
        attack,
        defense
        specialAttack
        specialDefense
        speed
      }
      types {
        id
        name
      }
    }
  }
  `;

  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: graphqlQuery })
  });
  const { data } = await response.json();

  return { pokemon: data.pokemon };
};

export default PokemonPage;
