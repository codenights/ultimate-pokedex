import React from "react";
import Link from "next/link";

import { TypeBadge } from "../TypeBadge";
import { Section } from "./Section";

export const AbilityDetails = ({ ability }) => (
  <div>
    <Section>
      <p>{ability.description}</p>
    </Section>

    <Section>
      <h2>Pokemons using {ability.name}</h2>

      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Pokemon</td>
            <td>Type(s)</td>
            <td>Hidden ability</td>
          </tr>
        </thead>

        <tbody>
          {ability.pokemons.map(({ isHidden, pokemon }) => (
            <tr key={pokemon.id}>
              <td># {pokemon.id}</td>

              <td>
                <img src={pokemon.spriteUrl} alt={pokemon.names.en} />

                <Link href={`/pokemon/${pokemon.id}`}>
                  <a>{pokemon.names.en}</a>
                </Link>
              </td>

              <td>
                <ul>
                  {pokemon.types.map(type => (
                    <li key={type.id}>
                      <TypeBadge type={type} />
                    </li>
                  ))}
                </ul>
              </td>

              <td>{isHidden ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>

    <style jsx>{`
      div {
        padding: 20px;
        height: 100%;
        overflow-y: auto;
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
  </div>
);
