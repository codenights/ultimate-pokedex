import React from "react";
import PropTypes from "prop-types";

import { TypeBadge } from "./TypeBadge";

export const DamageTypeBadge = ({ type, multiplier }) => (
  <TypeBadge type={type}>
    <span className="pl-2 text-sm tracking-wide">⨉{multiplier}</span>
  </TypeBadge>
);

DamageTypeBadge.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  multiplier: PropTypes.number.isRequired,
};
