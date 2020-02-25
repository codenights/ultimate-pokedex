import React from "react";

import { TypeBadge } from "../TypeBadge";
import { PokemonLink } from "../PokemonLink";

export const EggGroupDetails = ({ eggGroup }) => (
  <div className="px-8 h-full overflow-y-auto border-box text-gray-400">
    <section className="py-8">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-700">
            <th className="p-4 font-bold">#</th>
            <th className="p-4 font-bold">Pokemon</th>
            <th className="p-4 font-bold">Types</th>
          </tr>
        </thead>

        <tbody>
          {eggGroup.pokemons.map(pokemon => (
            <tr key={pokemon.id} className="border-b border-gray-700">
              <td className="py-2 px-2">{pokemon.id}</td>

              <td className="py-2 px-2">
                <PokemonLink
                  id={pokemon.id}
                  names={pokemon.names}
                  types={pokemon.types}
                  spriteUrl={pokemon.spriteUrl}
                />
              </td>

              <td className="py-2 px-2">
                <ul className="inline-flex">
                  {pokemon.types.map(type => (
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
