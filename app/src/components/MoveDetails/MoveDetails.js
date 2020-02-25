import React from "react";

import { TypeBadge } from "../TypeBadge";
import { PokemonLink } from "../PokemonLink";

export const MoveDetails = ({ move }) => (
  <div className="px-8 h-full overflow-y-auto border-box text-gray-400">
    <section className="py-8">
      <h2 className="text-xl mb-4 text-gray-600">About {move.name}</h2>
      <p>{move.description}</p>

      <dl>
        <dt>Power</dt>
        <dd>{move.power || "-"}</dd>

        <dt>Accuracy</dt>
        <dd>{move.accuracy || "-"}</dd>

        <dt>PP</dt>
        <dd>{move.pp}</dd>

        <dt>Damage class</dt>
        <dd>
          <img src={`/img/${move.damageClass}.png`} alt={move.damageClass} />
          <span>{move.damageClass}</span>
        </dd>

        <dt>Critical Rate</dt>
        <dd>{move.criticalRate}</dd>

        <dt>Flinch chance</dt>
        <dd>{move.flinchChance}%</dd>

        <dt>Drains</dt>
        <dd>{move.drain ? `${move.drain}%` : "-"}</dd>

        <dt>Heals</dt>
        <dd>{move.healing ? `${move.healing}%` : "-"}</dd>
      </dl>
    </section>

    <section className="py-8">
      <h2 className="text-xl mb-4 text-gray-600">
        Pokemon learning {move.name}
      </h2>

      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-700">
            <th className="p-4 font-bold">#</th>
            <th className="p-4 font-bold">Pokemon</th>
            <th className="p-4 font-bold">Types</th>
          </tr>
        </thead>

        <tbody>
          {move.pokemons.map(({ id, names, types, spriteUrl }) => (
            <tr key={id}>
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
