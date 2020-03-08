import React from "react";
import { Highlight } from "react-instantsearch-dom";

import { TypeIcon } from "../TypeIcon";
import { useShiny } from "../ShinyMode";
import {
  Card,
  CardFrame,
  CardTitle,
  Dcard,
  PokemonArtwork,
  PokemonName,
} from "./styles";
import Link from "next/link";

export const PokemonHit = ({ pokemon }) => {
  const imageUrl = useShiny(
    `https://res.cloudinary.com/hilnmyskv/image/upload/q_auto:eco,w_110/v1583100880/pokedex_artwork/${pokemon.id}.webp`,
    pokemon.spriteShinyUrl
  );
  const type = pokemon.types[0];

  return (
    <Dcard className="w-1/2 md:w-1/4 xl:w-1/5 my-4">
      <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemon.id}`}>
        <a>
          <Card type={type} className="mx-3">
            <CardFrame className="fade fade-in text-center frame">
              <PokemonArtwork artworkUrl={imageUrl} alt={pokemon.names.en} />
              <CardTitle>
                <PokemonName
                  type={type}
                  className={`font-pokemon text-center text-2xl text-type-${type.name.toLowerCase()}`}
                >
                  <Highlight
                    tagName="mark"
                    attribute="names.en"
                    hit={pokemon}
                  />
                </PokemonName>

                <div className="text-center whitespace-no-wrap text-xs italic mt-0 mb-6 text-gray-600">
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
              </CardTitle>

              <div className="absolute top-0 left-0 pl-2 pt-1">
                <span className="text-xl font-bold text-gray-900">
                  {pokemon.id}
                </span>
              </div>

              <ul className="absolute top-0 right-0 p-2">
                {pokemon.types.map(type => (
                  <li className="mb-1" key={type.name}>
                    <TypeIcon type={type.name} />
                  </li>
                ))}
              </ul>
            </CardFrame>
          </Card>
        </a>
      </Link>
    </Dcard>
  );
};
