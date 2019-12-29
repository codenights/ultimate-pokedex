import React from "react";
import PropTypes from "prop-types";

export const TypeBadgeAlgolia = ({ type }) => (
  <span className={`inline-block whitespace-no-wrap rounded-full text-center px-3 pb-2 pt-1 bg-type-${type.toLowerCase()}`}>
    <img className="inline align-text-bottom p-0 mr-2" src={`./icons/types/${type.toLowerCase()}.svg`} width="16"/>
    <span className="text-sm align-middle text-white uppercase font-semibold mr-1">{type}</span>
  </span>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
