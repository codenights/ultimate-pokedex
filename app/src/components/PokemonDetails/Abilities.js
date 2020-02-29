import React from "react";
import Link from "next/link";

import { Title } from "../../ui";
import { Section } from "./Section";

export const Abilities = ({ pokemon }) => (
  <Section>
    <Title>Abilities</Title>

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
