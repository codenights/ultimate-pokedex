import React from "react";
import { Highlight, connectCurrentRefinements } from "react-instantsearch-dom";

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
      <div className="dcard w-1/2 md:w-1/4 xl:w-1/5 mt-24">
        <PokemonLink pokemonId={pokemon.id}>
        
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>
          <div className="trigger"></div>

          <div className="card p-6 m-3 bg-gray-900 rounded-lg">
            <div className="frame">
              <img className="-mt-32" src={spriteUrl} alt={pokemon.names.en} />

              <div className="title">
                <div
                  className={`pokemon-name text-center text-4xl mb-2 text-type-${pokemon.types[0].name.toLowerCase()}`}
                >
                  <Highlight
                    tagName="mark"
                    attribute="names.en"
                    hit={pokemon}
                  />
                </div>

                <div className="text-center whitespace-no-wrap text-xl italic text-gray-600 mb-6">
                  <Highlight
                    tagName="mark"
                    attribute="names.fr"
                    hit={pokemon}
                  />
                  {" - "}
                  <Highlight
                    tagName="mark"
                    attribute="names.ja"
                    hit={pokemon}
                  />
                </div>
              </div>

              <div className="absolute pl-3 pt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {pokemon.id}
                  </span>
                </div>

              <ul className="absolute top-0 right-0 p-2">
                {pokemon.types.map(type => (
                  <li className="mb-2" key={type.name}>
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
          </div>
        </PokemonLink>
        <style jsx>{`
          .pokemon-name {
            text-shadow: 0 0 24px var(--color-type-${pokemon.types[0].name.toLowerCase()}),
            0 0 70px var(--color-type-${pokemon.types[0].name.toLowerCase()});
          }
          .card {
            background-image:
              radial-gradient(
                circle at 2%,
                rgba(230, 230, 255, 0.2),
                rgba(46, 52, 64, 0.3) 40%,
                rgba(26, 32, 44, 0.6) 85%
              ),
              linear-gradient(
                20deg,
                #1a202c 55%,
                var(--color-type-${pokemon.types[0].name.toLowerCase()})
              );
          }
        `}</style>
      </div>
    );
  }
);
