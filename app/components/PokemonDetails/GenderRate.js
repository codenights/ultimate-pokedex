import React from "react";

export const GenderRate = ({ pokemon }) => {
  if (pokemon.genderRate === -1) {
    return <span>Genderless</span>;
  }

  const percentageFemale = pokemon.genderRate * 12.5;
  const percentageMale = 100 - percentageFemale;

  return (
    <span>
      <span>{percentageMale}% male</span>,{" "}
      <span>{percentageFemale}% female</span>
      <style jsx>
        {`
          span span:first-child {
            color: #3273dc;
          }

          span span:last-child {
            color: #ff6bce;
          }
        `}
      </style>
    </span>
  );
};
