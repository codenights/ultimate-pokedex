import React from "react";

import { Section } from "./Section";

export const Abilities = ({ pokemon }) => (
  <Section>
    <h2>Abilities</h2>

    <ul>
      {pokemon.abilities.map(({ isHidden, ability }) => (
        <li key={ability.id}>
          <a href={`/ability/${ability.id}`}>
            {ability.name} {isHidden && <span>(Hidden ability)</span>}
          </a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      span {
        color: #555;
      }

      li + li {
        margin-top: 5px;
      }

      a {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
      }

      span {
        margin-left: 5px;
        font-size: 1.2rem;
      }
    `}</style>
  </Section>
);
