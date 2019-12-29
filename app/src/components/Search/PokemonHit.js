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
    // const color = COLORS_BY_TYPE[pokemon.types[0].name.toLowerCase()];
    const statRefinements = refinements.filter(refinement =>
      refinement.attribute.startsWith("stats.")
    );

    return (
      <article className="w-1/4 mt-32">
        <PokemonLink pokemonId={pokemon.id}>
          <div className="bg-white border border-solid border-gray-300 rounded p-6 m-2">
          <img className="-mt-32" src={spriteUrl} alt={pokemon.names.en} />
            <div className="text-4xl mb-4">
              <Highlight tagName="mark" attribute="names.en" hit={pokemon} />
              <span className="text-2xl text-gray-500"> <span className="text-1xl text-gray-400">#</span>{pokemon.id}</span>
            </div>
            {/* <p className="text-xl text-gray-500">
              <Highlight tagName="mark" attribute="names.fr" hit={pokemon} />{" "}
              <Tag>
              <span>fr</span>
              </Tag>
              {pokemon.names.ja && (
                <>
                  {" "}
                  /{" "}
                  <Highlight
                    tagName="mark"
                    attribute="names.ja"
                    hit={pokemon}
                  />{" "}
                  <Tag>
                    <span>ja</span>
                  </Tag>
                </>
              )}
            </p> */}
          <ul>
            {pokemon.types.map(type => (
              <li className="inline mr-2" key={type.name}>
                <TypeBadgeIcon type={type.name} />
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
