import React from "react";
import PropTypes from "prop-types";

export const TypeBadgeAlgolia = ({ type }) => (
  <span className={`tag inline-block whitespace-no-wrap rounded-full text-center px-2 pb-1 pt-0 bg-type-${type.toLowerCase()}`}>
    <svg className="fill-current text-gray-900 inline mr-1" width="14" viewBox="0 0 512 512">
      <use xlinkHref={`/icons/types/${type.toLowerCase()}.svg#${type.toLowerCase()}`}></use>
    </svg>
    <span className="text-xs text-gray-900 font-bold mr-1">{type}</span>
    <style jsx>{`
      .tag {
        box-shadow: 0 0 5px var(--color-type-${type.toLowerCase()});
      }
    `}</style>
  </span>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
