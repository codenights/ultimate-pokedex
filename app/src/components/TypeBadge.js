import React from "react";
import PropTypes from "prop-types";

export const TypeBadge = ({ type }) => (
  <span>
    {type.name}

    <style jsx>{`
      span {
        display: inline-block;
        border-radius: 4px;
        padding: 4px 12px;
        background: ${type.color};
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
        font-family: monospace;
        border: 2px solid rgba(0, 0, 0, 0.25);
      }
    `}</style>
  </span>
);

TypeBadge.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })
};
