import React from "react";
import Link from "next/link";

import { Section } from "./Section";

export const Abilities = ({ pokemon }) => (
  <Section>
    <h2>Abilities</h2>

    <ul>
      {pokemon.abilities.map(({ isHidden, ability }) => (
        <li key={ability.id}>
          <Link href="/ability/[abilityId]" as={`/ability/${ability.id}`}>
            <a>
              {ability.name} {isHidden && <span>(Hidden ability)</span>}
            </a>
          </Link>
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
