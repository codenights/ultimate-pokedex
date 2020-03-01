import React from "react";
import PropTypes from "prop-types";
import { TypeIcon } from "./TypeIcon";

export const DamageTypeBadge = ({ type, multiplier }) => (
  <TypeIcon type={type.name} />
);

DamageTypeBadge.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  multiplier: PropTypes.number.isRequired,
};
