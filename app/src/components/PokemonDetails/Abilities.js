import React from "react";
import Link from "next/link";

import { Section } from "./Section";

export const Abilities = ({ pokemon }) => (
  <Section>
    <h2 className="text-2xl text-gray-500">Abilities</h2>

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

  </Section>
);
