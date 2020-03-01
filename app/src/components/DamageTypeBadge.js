import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { TypeIcon } from "./TypeIcon";

export const DamageTypeBadge = ({ type }) => (
  <Link href="/type/[typeId]" as={`/type/${type.id}`}>
    <a>
      <TypeIcon type={type.name} />
    </a>
  </Link>
);

DamageTypeBadge.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
