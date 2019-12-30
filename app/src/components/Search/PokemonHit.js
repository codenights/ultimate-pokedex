import React from "react";
import { Highlight, connectCurrentRefinements } from "react-instantsearch-dom";
import { lighten, saturate } from "polished";
import Link from "next/link";

import { Tag } from "../Tag";
import { TypeBadgeIcon } from "../TypeBadgeIcon";
import { useShiny } from "../ShinyMode";
import { PokemonLink } from "../PokemonLink";

function getPropertyByPath(object, path) {
  const parts = path.split(".");

  return parts.reduce((current, key) => current && current[key], object);
}

function getRefinementName(value) {
  switch (value) {
    case "hp":
      return "HP";
    case "attack":
      return "Atk";
    case "defense":
      return "Def";
    case "specialAttack":
      return "Sp. Atk";
    case "specialDefense":
      return "Sp. Def";
    case "speed":
      return "Speed";
    default:
      return value;
  }
}

export const PokemonHit = connectCurrentRefinements(
  ({ items: refinements, pokemon }) => {
    const spriteUrl = useShiny(pokemon.artworkUrl, pokemon.spriteShinyUrl);
    const statRefinements = refinements.filter(refinement =>
      refinement.attribute.startsWith("stats.")
    );

    return (
      <article className="w-1/5 mt-24">
        <PokemonLink pokemonId={pokemon.id}>
          <div
            className={`relative p-6 m-2 bg-gray-900 rounded-lg`}
          >
            <img className="-mt-32" src={spriteUrl} alt={pokemon.names.en} />
            
            <div className={`text-center text-4xl mb-2 text-type-${pokemon.types[0].name.toLowerCase()}`}>
              <Highlight tagName="mark" attribute="names.en" hit={pokemon} />
              <span className="text-3xl text-gray-600">
                <span className="ml-2 text-xl text-gray-700">#</span>
                {pokemon.id}
              </span>
            </div>

            <div className="text-center text-xl italic text-gray-600 mb-6">
              <Highlight tagName="mark" attribute="names.fr" hit={pokemon} />
              {" - "}
              <Highlight tagName="mark" attribute="names.ja" hit={pokemon} />
            </div>

            <ul className="absolute top-0 right-0 p-2">
              {pokemon.types.map(type => (
                <li className="mb-2" key={type.name}>
                  <TypeBadgeIcon type={type.name} />
                </li>
              ))}
            </ul>

            <ul>
            {Object.keys(pokemon.stats).map(statName => (
              <li key={statName} className="leading-normal text-xl text-gray-700">
                <span>
                {statName
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, str => str.toUpperCase())
                }
                </span>
                <span className="float-right">
                  {pokemon.stats[statName]}
                </span>
              </li>
            ))}
            </ul>

            {statRefinements && (
              <ul>
                {statRefinements.map(refinement => (
                  <li key={refinement.attribute}>
                    <Tag>
                      {getRefinementName(refinement.attribute.split(".")[1])}{" "}
                      <strong>
                        {getPropertyByPath(pokemon, refinement.attribute)}
                      </strong>
                    </Tag>
                  </li>
                ))}
              </ul>
            )}
            
          </div>
        </PokemonLink>
      </article>
    );
  }
);
