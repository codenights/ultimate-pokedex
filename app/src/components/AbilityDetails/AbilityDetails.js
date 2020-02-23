import React from "react";
import Link from "next/link";

import { TypeBadge } from "../TypeBadge";
import { PokemonLink } from "../PokemonLink";

export const AbilityDetails = ({ ability }) => (
  <div className="px-8 h-full overflow-y-auto border-box text-gray-400">
    <section className="py-8">
      <h2 className="text-xl mb-4 text-gray-600">About {ability.name}</h2>
      <p>{ability.description}</p>
    </section>

    <section className="py-8">
      <h2 className="text-xl mb-4 text-gray-600">
        Pokemons using {ability.name}
      </h2>

      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-gray-700">
            <td className="p-4 font-bold">#</td>
            <td className="p-4 font-bold">Pokemon</td>
            <td className="p-4 font-bold">Types</td>
          </tr>
        </thead>

        <tbody>
          {ability.pokemons.map(({ isHidden, pokemon }) => (
            <tr key={pokemon.id} className="border-b border-gray-700">
              <td className="py-2 px-2">{pokemon.id}</td>

              <td className="py-2 px-2">
                <PokemonLink
                  id={pokemon.id}
                  names={pokemon.names}
                  types={pokemon.types}
                  spriteUrl={pokemon.spriteUrl}
                >
                  {isHidden && (
                    <span className="ml-4 px-2 py-0 text-xs rounded bg-indigo-300 text-indigo-900 leading-tight">
                      Hidden
                    </span>
                  )}
                </PokemonLink>
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
