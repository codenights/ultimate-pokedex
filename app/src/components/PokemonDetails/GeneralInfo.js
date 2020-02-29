import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Title } from "../../ui";
import { Section } from "./Section";
import { GenderRate } from "./GenderRate";

const hectogramToKilogram = amount => (amount / 10).toFixed(2);

const hectogramToPound = amount => (amount * 0.220462).toFixed(2);

const decimeterToMeter = amount => (amount / 10).toFixed(2);

const decimeterToFeet = amount => (amount * 0.328084).toFixed(2);

const DescriptionTerm = styled.dt`
  overflow: hidden;
  white-space: nowrap;

  &::after {
    content: " .................................................................";
    color: rgba(98, 116, 152, 0.61);
  }
`;

const DescriptionDetails = styled.dd.attrs({
  className: "text-gray-400 font-bold",
})``;

export const GeneralInfo = ({ pokemon }) => (
  <Section>
    <Title>About</Title>

    <dl className="grid" style={{ gridTemplateColumns: "250px 1fr" }}>
      <DescriptionTerm>Weight</DescriptionTerm>
      <DescriptionDetails>
        {hectogramToKilogram(pokemon.weight)}{" "}
        <span className="text-gray-500">kg</span> (
        {hectogramToPound(pokemon.weight)} lbs)
      </DescriptionDetails>

      <DescriptionTerm>Height</DescriptionTerm>
      <DescriptionDetails>
        {decimeterToMeter(pokemon.height)}{" "}
        <span className="text-gray-500">m</span> (
        {decimeterToFeet(pokemon.height)}')
      </DescriptionDetails>

      <DescriptionTerm>Base Hapiness</DescriptionTerm>
      <DescriptionDetails>{pokemon.baseHappiness}</DescriptionDetails>

      <DescriptionTerm>Capture Rate</DescriptionTerm>
      <DescriptionDetails>{pokemon.captureRate}</DescriptionDetails>

      <DescriptionTerm>Gender rate</DescriptionTerm>
      <DescriptionDetails>
        <GenderRate pokemon={pokemon} />
      </DescriptionDetails>

      <DescriptionTerm>Egg groups</DescriptionTerm>
      <DescriptionDetails>
        <ul className="inline-flex">
          {pokemon.eggGroups.map(({ id, name }) => (
            <li key={id} className="mr-1">
              <Link href="/egg-group/[eggGroupId]" as={`/egg-group/${id}`}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </DescriptionDetails>
    </dl>
  </Section>
);
