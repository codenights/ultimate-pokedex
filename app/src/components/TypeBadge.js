import React from "react";
import PropTypes from "prop-types";
import {TypeIcon} from "./TypeIcon";

export const TypeBadge = ({ type }) => (
<span
    className={"tag flex whitespace-no-wrap rounded-full text-center px-2 items-center p-1 my-2"}
  >
    <TypeIcon type={type.name} />
    <span className="type-name text-md ml-2">{type.name}</span>
    
    <style jsx>{`
      .type-name {
        color: var(--color-type-${type.name.toLowerCase()});
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
