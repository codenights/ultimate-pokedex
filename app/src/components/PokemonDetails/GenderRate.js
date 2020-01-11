import React from "react";
import { Icons } from "../Icons";

export const GenderRate = ({ pokemon }) => {
  if (pokemon.genderRate === -1) {
    return <span>Genderless</span>;
  }
  const percentageFemale = pokemon.genderRate * 12.5;
  const percentageMale = 100 - percentageFemale;

  return (
    <span>
      
      <span className="flex text-gender-male items-center">
        {percentageMale}%
        <Icons
        icon="male"
        className="fill-current mx-1"
        width="16"
        height="16"
      /> male
      </span>
      <span className="flex text-gender-female items-center">
        {percentageFemale}%
        <Icons
        icon="female"
        className="fill-current mx-1"
        width="16"
        height="16"
      />
        female
      </span>
    </span>
  );
};
