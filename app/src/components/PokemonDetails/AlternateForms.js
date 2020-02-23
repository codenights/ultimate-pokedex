import React from "react";

import { Section } from "./Section";
import { PokemonLink } from "../PokemonLink";
import Link from "next/link";

export const AlternateForms = ({ pokemon }) => {
  if (pokemon.varieties.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2>Alternate forms of {pokemon.names.en}</h2>

      <ul>
        {pokemon.varieties.map(variety => (
          <li key={variety.id}>
            <Link href="/pokemon/[nationalId]" as={`/pokemon/${variety.id}`}>
              <a>
                <img src={variety.artworkUrl} alt={variety.name} />
                <p>{variety.names.en}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        ul {
          display: flex;
        }

        li {
          text-align: center;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        li {
        }

        li + li {
          margin-left: 20px;
          padding-left: 20px;
          border-left: 1px solid #ddd;
        }

        img {
          height: 100px;
        }
      `}</style>
    </Section>
  );
};
