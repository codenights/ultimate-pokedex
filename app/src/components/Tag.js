import React from "react";
import PropTypes from "prop-types";

export const Tag = ({ children }) => (
  <span className="text-sm rounded p-2 bg-gray-200 text-gray-600">
    {children}
  </span>
);

Tag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
