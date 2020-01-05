import React from "react";

import { Section } from "./Section";
import { TypeBadge } from "../TypeBadge";
import { PokemonLink } from "../PokemonLink";

export const PokemonLearningMove = ({ move }) => (
  <Section>
    <h2>Pokemons learning {move.name}</h2>

    <table className="table-auto">
      <thead>
        <tr className="border-b border-gray-800 text-sm text-gray-400">
          <th className="w-1/12 py-2 font-normal">#</th>
          <th className="w-4/12 py-2 font-normal">Pokemon</th>
          <th className="w-3/12 py-2 font-normal">Type(s)</th>
        </tr>
      </thead>

      <tbody className="text-gray-600">
        {move.pokemons.map(({ id, names, types, spriteUrl }) => (
          <tr key={id}>
            <td className="border-t border-gray-800 px-4 py-1">#{id}</td>
            <td className="border-t border-gray-800 px-4 py-1 text-gray-400 font-pokemon">
              <PokemonLink pokemonId={id}>
                <img src={spriteUrl} alt={names.en} />
                {names.en}
              </PokemonLink>
            </td>
            <td className="border-t border-gray-800 px-4 py-1">
              <ul>
                {types.map(type => (
                  <li key={type.id}>
                    <TypeBadge type={type} />
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);
