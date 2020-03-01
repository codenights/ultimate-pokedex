import React from "react";
import styled from "styled-components";

import { Title } from "../../ui";
import { Section } from "./Section";
import { GenderRate } from "./GenderRate";
import { EggGroup } from "./EggGroup";

const hectogramToKilogram = amount => (amount / 10).toFixed(2);

// const hectogramToPound = amount => (amount * 0.220462).toFixed(2);

const decimeterToMeter = amount => (amount / 10).toFixed(2);

// const decimeterToFeet = amount => (amount * 0.328084).toFixed(2);

const DescriptionTerm = styled.dt`
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 8px;
  &::before {
    content: "•";
    color: rgba(98, 116, 152, 0.41);
    margin-right: 8px;
    display: inline-block;
  }
  &::after {
    content: " .................................................................";
    color: rgba(98, 116, 152, 0.4);
  }
`;

const DescriptionDetails = styled.dd
.attrs({
  className: "text-gray-300 ml-1",
})``;


export const GeneralInfo = ({ pokemon }) => (
  <Section>
    <Title>About</Title>

    <dl className="grid" style={{ gridTemplateColumns: "250px 1fr" }}>
      <DescriptionTerm>Weight</DescriptionTerm>
      <DescriptionDetails>
        {hectogramToKilogram(pokemon.weight)}{" "}
        <span className="text-gray-600">kg</span>
        {/* ({hectogramToPound(pokemon.weight)} lbs) */}
      </DescriptionDetails>

      <DescriptionTerm>Height</DescriptionTerm>
      <DescriptionDetails>
        {decimeterToMeter(pokemon.height)}{" "}
        <span className="text-gray-600">m</span>
        {/* ({decimeterToFeet(pokemon.height)}') */}
      </DescriptionDetails>

      <DescriptionTerm>Hapiness</DescriptionTerm>
      <DescriptionDetails>
      {pokemon.baseHappiness}{" "}
      <span className="text-gray-600">%</span>
      </DescriptionDetails>

      <DescriptionTerm>Capture</DescriptionTerm>
      <DescriptionDetails>
      {pokemon.captureRate}
      </DescriptionDetails>

      <DescriptionTerm>Gender</DescriptionTerm>
      <DescriptionDetails>
        <GenderRate pokemon={pokemon} />
      </DescriptionDetails>

      <DescriptionTerm>Egg groups</DescriptionTerm>
      <DescriptionDetails>

        <ul className="inline-flex">
          {pokemon.eggGroups.map(({ id, name }) => (
            <li key={id} className="mr-1">
              <EggGroup id={id} name={name} />
            </li>
          ))}
        </ul>
      </DescriptionDetails>
    </dl>
  </Section>
);
