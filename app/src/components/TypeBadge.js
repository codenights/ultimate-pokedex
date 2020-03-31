import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { TypeIcon } from "./TypeIcon";

export const TypeBadge = ({ type, ...props }) => (
  <Link href="/type/[typeId]" as={`/type/${type.id}`}>
    <a {...props}>
      <span className="flex whitespace-no-wrap text-center items-center">
        <TypeIcon type={type.name} />
        <span className="type-name text-md ml-1">{type.name}</span>

        <style jsx>{`
          .type-name {
            // prettier-ignore
            color: var(--color-type-${type.name.toLowerCase()});
          }
        `}</style>
      </span>
    </a>
  </Link>
);

TypeBadge.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
