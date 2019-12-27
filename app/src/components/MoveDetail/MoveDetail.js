import React from "react";

import { PokemonLearningMove } from "./PokemonsLearningMove";
import { AboutMove } from "./AboutMove";

export const MoveDetail = ({ move }) => (
  <div>
    <AboutMove move={move} />

    <PokemonLearningMove move={move} />

    <style jsx>{`
      div {
        box-sizing: border-box;
        padding: 20px;
        height: 100%;
        overflow-y: auto;
      }
    `}</style>
  </div>
);
