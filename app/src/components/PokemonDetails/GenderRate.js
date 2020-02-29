import React from "react";
import { Icons } from "../Icons";

export const GenderRate = ({ pokemon }) => {
  if (pokemon.genderRate === -1) {
    return <span>Genderless</span>;
  }
  const percentageFemale = pokemon.genderRate * 12.5;
  const percentageMale = 100 - percentageFemale;

  return (
    <div className="inline-flex">
      <span className="flex items-center">
        <Icons
          icon="male"
          className="fill-current mx-1 text-gender-male"
          width="16"
          height="16"
        />
        {percentageMale} <span className="text-gray-600 ml-1">%</span>
      </span>

      <span className="flex items-center">
        <Icons
          icon="female"
          className="fill-current mx-1 text-gender-female"
          width="16"
          height="16"
        />
        {percentageFemale} <span className="text-gray-600 ml-1">%</span>
      </span>
    </div>
  );
};
