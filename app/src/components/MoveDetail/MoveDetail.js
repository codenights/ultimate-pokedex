import React from "react";

import { PokemonLearningMove } from "./PokemonsLearningMove";
import { AboutMove } from "./AboutMove";

export const MoveDetail = ({ move }) => (
  <div>
    <p>{move.description}</p>

    <AboutMove move={move} />

    <PokemonLearningMove move={move} />

  </div>
);
