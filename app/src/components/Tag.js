import React from "react";
import PropTypes from "prop-types";

export const Tag = ({ children }) => (
  <span className="text-sm text-gray-600">
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
