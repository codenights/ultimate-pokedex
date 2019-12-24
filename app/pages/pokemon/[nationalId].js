import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import { TypeBadge } from "../../components/TypeBadge";

const PokemonPreview = ({ pokemon }) => (
  <Link href={`/pokemon/${pokemon.id}`}>
    <a>
      <style jsx>{`
        a {
          display: inline-block;
          padding: 20px;
          text-align: center;
        }

        img {
          max-width: 50px;
        }
      `}</style>

      <img src={pokemon.spriteUrl} />
      <p>{pokemon.name}</p>
    </a>
  </Link>
);

const Evolutions = ({ evolutions }) => (
  <div>
    {evolutions.map(({ pokemon }) => (
      <Evolution key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

const Evolution = ({ pokemon }) => (
  <div>
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
      }
    `}</style>

    <PokemonPreview pokemon={pokemon} />

    {pokemon.evolutions && <Evolutions evolutions={pokemon.evolutions} />}
  </div>
);

const PokemonPage = ({ pokemon }) => {
  return (
    <main>
      <section>
        <div>
          <img alt={`${pokemon.name} sprite`} src={pokemon.artworkUrl} />
        </div>
        <h1>{pokemon.name}</h1>

        <ul>
          {pokemon.types.map(type => (
            <li key={type.id}>
              <TypeBadge type={type.name} />
            </li>
          ))}
        </ul>

        <Evolution pokemon={pokemon.family.pokemon} />
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
      artworkUrl
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
      family {
        pokemon {
          id
          name
          spriteUrl
          evolutions {
            pokemon {
              id
              name
              spriteUrl
              evolutions {
                pokemon {
                  id
                  name
                  spriteUrl
                }
              }
            }
          }
        }
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
