import React from "react";

import { Title } from "../../ui";
import { Section } from "./Section";

export const PokedexEntries = ({ pokemon }) => (
  <Section>
    <Title>Pokedex entries</Title>

    <table>
      <thead>
        <tr>
          <td>Game</td>
          <td>Pokedex entry</td>
        </tr>
      </thead>
      <tbody>
        {pokemon.pokedexEntries.map(({ entry, version }) => (
          <tr key={version.id}>
            <td style={{ color: version.color }}>{version.name}</td>
            <td>{entry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);
