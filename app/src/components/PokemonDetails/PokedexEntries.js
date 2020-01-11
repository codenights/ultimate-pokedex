import React from "react";

import { Section } from "./Section";

export const PokedexEntries = ({ pokemon }) => (
  <Section>
    <h2 className="text-2xl text-gray-500">Pokedex entries</h2>
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
            <td style={{ color: version.color }}>
              {version.name}
            </td>
            <td>{entry}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);
