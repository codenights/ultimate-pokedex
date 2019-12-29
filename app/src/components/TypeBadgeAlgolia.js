import React from "react";
import PropTypes from "prop-types";

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
  <span className="inline-block text-center px-2 py-1">
    {type}
    <style jsx>{`
      span {
        background: ${COLORS_BY_TYPE[type.toLowerCase()]};
      }
    `}</style>
  </span>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
