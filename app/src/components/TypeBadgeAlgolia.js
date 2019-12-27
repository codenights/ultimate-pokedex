import React from "react";

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

export const TypeBadgeAlgolia = ({ type }) => (
  <span>
    {type}

    <style jsx>{`
      span {
        display: inline-block;
        border-radius: 4px;
        padding: 4px 12px;
        background: ${COLORS_BY_TYPE[type.toLowerCase()]};
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
        font-family: monospace;
        border: 2px solid rgba(0, 0, 0, 0.25);
      }
    `}</style>
  </span>
);
