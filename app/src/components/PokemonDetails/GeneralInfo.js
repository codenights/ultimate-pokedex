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
    <h2 className="text-2xl text-gray-500">About</h2>

    <dl className="flex flex-wrap">
      <dt className="w-4/12">Weight</dt>
      <dd className="w-1/2 text-gray-400">
        {hectogramToKilogram(pokemon.weight)}kg (
        {hectogramToPound(pokemon.weight)}lbs)
      </dd>

      <dt  className="w-4/12">Height</dt>
      <dd  className="w-1/2 text-gray-400">
        {decimeterToMeter(pokemon.height)}m ({decimeterToFeet(pokemon.height)}')
      </dd>

      <dt  className="w-4/12">Base Hapiness</dt>
      <dd  className="w-1/2 text-gray-400">{pokemon.baseHappiness}</dd>

      <dt  className="w-4/12">Capture Rate</dt>
      <dd  className="w-1/2 text-gray-400">{pokemon.captureRate}</dd>

      <dt  className="w-4/12">Gender rate</dt>
      <dd  className="w-1/2 text-gray-400">
        <GenderRate pokemon={pokemon} />
      </dd>
      
      <dt className="w-4/12">Egg groups</dt>
      <dd className="w-1/2 text-gray-400">
        {pokemon.eggGroups.map(({ id, name }) => (
          <span key={id}>
            <Link href="/egg-group/[eggGroupId]" as={`/egg-group/${id}`}>
              <a>{name}</a>
            </Link>
          </span>
        ))}
      </dd>
    </dl>

  </Section>
);
