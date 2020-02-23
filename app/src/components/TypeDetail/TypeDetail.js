import React from "react";
import { PokemonLink } from "../PokemonLink";
import { TypeBadge } from "../TypeBadge";

export const TypeDetail = ({ type }) => (
  <section>
    <h2>About {type.name}</h2>

    <h3>Damages from</h3>

    <ul>
      {type.damagesFrom.map(damageType => (
        <li>
          {damageType.type.name} x{damageType.multiplier}
        </li>
      ))}
    </ul>

    <h3>Damages to</h3>

    <ul>
      {type.damagesTo.map(damageType => (
        <li>
          {damageType.type.name} x{damageType.multiplier}
        </li>
      ))}
    </ul>

    <table className="table-auto">
      <thead>
        <tr className="border-b border-gray-800 text-sm text-gray-400">
          <th className="w-1/12 py-2 font-normal">#</th>
          <th className="w-4/12 py-2 font-normal">Pokemon</th>
          <th className="w-3/12 py-2 font-normal">Type(s)</th>
        </tr>
      </thead>

      <tbody className="text-gray-600">
        {type.pokemons.map(({ id, names, types, spriteUrl }) => (
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
  </section>
);
