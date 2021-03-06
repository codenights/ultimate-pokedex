import React from "react";
import { PokemonLink } from "../PokemonLink";
import { TypeBadge } from "../TypeBadge";
import { DamageTypeBadge } from "../DamageTypeBadge";

export const TypeDetails = ({ type }) => (
  <div className="px-8 h-full overflow-y-auto border-box text-gray-400">
    <section className="py-8">
      <h2 className="text-xl mb-4 text-gray-600">Damages from</h2>

      <ul className="inline-flex">
        {type.damagesFrom.map(damageType => (
          <li key={damageType.type.name}>
            <DamageTypeBadge
              type={damageType.type}
              multiplier={damageType.multiplier}
            />
          </li>
        ))}
      </ul>

      <h2 className="text-xl mb-4 text-gray-600">Damages to</h2>

      <ul className="inline-flex">
        {type.damagesTo.map(damageType => (
          <li key={damageType.type.name}>
            <DamageTypeBadge
              type={damageType.type}
              multiplier={damageType.multiplier}
            />
          </li>
        ))}
      </ul>

      <h2 className="text-xl mb-4 text-gray-600">Pokemon</h2>

      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-700">
            <th className="p-4 font-bold">#</th>
            <th className="p-4 font-bold">Pokemon</th>
            <th className="p-4 font-bold">Types</th>
          </tr>
        </thead>

        <tbody>
          {type.pokemons.map(({ id, names, types, spriteUrl }) => (
            <tr key={id} className="border-b border-gray-700">
              <td className="py-2 px-2">{id}</td>
              <td className="py-2 px-2">
                <PokemonLink id={id} names={names} spriteUrl={spriteUrl} />
              </td>

              <td className="py-2 px-2">
                <ul className="inline-flex">
                  {types.map(type => (
                    <li key={type.id} className="mr-4 last:mr-0">
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
  </div>
);
