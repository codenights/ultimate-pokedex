import React from "react";
import { Highlight, connectCurrentRefinements } from "react-instantsearch-dom";
import { lighten, saturate } from "polished";

import { Tag } from "../Tag";
import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia";

const COLORS_BY_TYPE = {
  poison: "#a59",
  grass: "#7c5",
  fire: "#f42",
  flying: "#89f",
  water: "#39f",
  electric: "#fc3",
  dragon: "#76e",
  ice: "#6cf",
  fighting: "#b54",
  rock: "#ba6",
  ground: "#db5",
  psychic: "#f59",
  bug: "#ab2",
  dark: "#754",
  steel: "#aab",
  fairy: "#e9e",
  ghost: "#66b",
  normal: "#aa9"
};

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
  ({ items: refinements, pokemon, isShiny }) => {
    const color = COLORS_BY_TYPE[pokemon.types[0].name.toLowerCase()];
    const statRefinements = refinements.filter(refinement =>
      refinement.attribute.startsWith("stats.")
    );

    return (
      <div
        style={{
          borderColor: lighten(0.2, saturate(0.25, color)),
          background: lighten(0.4, color)
        }}
      >
        <a href={`pokemon/${pokemon.id}`}>
          <header>
            <h3>
              <Highlight tagName="mark" attribute="names.en" hit={pokemon} />
            </h3>

            <p>
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
            </p>
          </header>

          <img
            src={isShiny ? pokemon.spriteShinyUrl : pokemon.artworkUrl}
            alt={pokemon.names.en}
          />

          <p className="watermark-number">#{pokemon.id}</p>

          <ul>
            {pokemon.types.map(type => (
              <li key={type.name}>
                <TypeBadgeAlgolia type={type.name} />
              </li>
            ))}
          </ul>

          {statRefinements && (
            <ul
              style={{
                flexWrap: "wrap",
                lineHeight: 1.6
              }}
            >
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
        </a>

        <style jsx>{`
          div {
            display: block;
            border-radius: 2px;
            border-left: 4px solid;
            background: #fff;
            box-sizing: border-box;
            position: relative;
          }

          a {
            padding: 20px;
            text-decoration: none;
            color: inherit;
            display: grid;
            grid-template-columns: 1fr 150px;
            grid-template-rows: repeat(3, auto);
            align-items: center;
          }

          a:hover .watermark-number,
          a:focus .watermark-number {
            opacity: 0.7;
          }

          a:hover img,
          a:focus img {
            transform: scale(1.25);
          }

          img {
            position: relative;
            z-index: 1;
            height: 150px;
            grid-row: span 3;
            transition: transform 0.3s ease;
          }

          h3 {
            font-weight: bold;
            font-size: 2rem;
            margin-bottom: 6px;
          }

          p {
            font-size: 1.4rem;
            opacity: 0.75;
            line-height: 1.6;
          }

          strong {
            font-weight: bold;
          }

          ul {
            display: flex;
          }

          li:not(:last-of-type) {
            margin-right: 4px;
          }

          .watermark-number {
            position: absolute;
            top: 10px;
            right: 10px;
            font-weight: bold;
            font-size: 4rem;
            opacity: 0.3;
            transition: opacity 0.2s ease;
          }
        `}</style>
      </div>
    );
  }
);
