import React from "react";

import { Section } from "./Section";
import { TypeBadge } from "../TypeBadge";
import { PokemonLink } from "../PokemonLink";

export const PokemonLearningMove = ({ move }) => (
  <Section>
    <h2>Pokemons learning {move.name}</h2>

    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Pokemon</td>
          <td>Type(s)</td>
        </tr>
      </thead>

      <tbody>
        {move.pokemons.map(({ id, names, types, spriteUrl }) => (
          <tr key={id}>
            <td>#{id}</td>
            <td>
              <img src={spriteUrl} alt={names.en} />

              <PokemonLink pokemonId={id}>{names.en}</PokemonLink>
            </td>
            <td>
              <ul>
                {types.map(type => (
                  <li key={type.id}>
                    <TypeBadge type={type} />
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <style jsx>{`
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
  </Section>
);
