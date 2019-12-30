import React from "react";
import Link from "next/link";

import { Section } from "./Section";
import { GenderRate } from "./GenderRate";

const hectogramToKilogram = amount => (amount / 10).toFixed(2);

const hectogramToPound = amount => (amount * 0.220462).toFixed(2);

const decimeterToMeter = amount => (amount / 10).toFixed(2);

const decimeterToFeet = amount => (amount * 0.328084).toFixed(2);

export const GeneralInfo = ({ pokemon }) => (
  <Section>
    <h2>About {pokemon.names.en}</h2>

    <dl>
      <dt>Weight</dt>
      <dd>
        {hectogramToKilogram(pokemon.weight)}kg (
        {hectogramToPound(pokemon.weight)}lbs)
      </dd>

      <dt>Height</dt>
      <dd>
        {decimeterToMeter(pokemon.height)}m ({decimeterToFeet(pokemon.height)}')
      </dd>

      <dt>Base Hapiness</dt>
      <dd>{pokemon.baseHappiness}</dd>

      <dt>Capture Rate</dt>
      <dd>{pokemon.captureRate}</dd>

      <dt>Gender rate</dt>
      <dd>
        <GenderRate pokemon={pokemon} />
      </dd>

      <dt>Egg groups</dt>
      <dd>
        {pokemon.eggGroups.map(({ id, name }) => (
          <span key={id}>
            <Link href="/egg-group/[eggGroupId]" as={`/egg-group/${id}`}>
              <a>{name}</a>
            </Link>
          </span>
        ))}
      </dd>
    </dl>

    <style jsx>{`
      dl {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 10px;
      }

      dt {
        opacity: 0.75;
      }

      dd {
        font-weight: bold;
      }

      span + span::before {
        content: ", ";
      }
    `}</style>
  </Section>
);
