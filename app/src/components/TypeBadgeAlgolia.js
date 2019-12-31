import React from "react";
import PropTypes from "prop-types";

export const TypeBadgeAlgolia = ({ type }) => (
  <span className={`inline-block whitespace-no-wrap rounded-full text-center px-3 pb-2 pt-1 bg-type-${type.toLowerCase()}`}>
    <svg className="fill-current text-white inline align-text-bottom mr-2" width="14" viewBox="0 0 512 512">
      <use xlinkHref={`/icons/types/${type.toLowerCase()}.svg#${type.toLowerCase()}`}></use>
    </svg>
    <span className="text-sm align-middle text-white uppercase font-semibold mr-1">{type}</span>
  </span>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
