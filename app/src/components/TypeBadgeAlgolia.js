import React from "react";
import PropTypes from "prop-types";
import { TypeIcon } from "./TypeIcon";

export const TypeBadgeAlgolia = ({ type, count }) => (
  <span className={`tag w-full flex flex-fill whitespace-no-wrap rounded-full text-center px-2 items-center p-1 my-2`}>
    <TypeIcon type={type} />
    <span className="type-name text-md ml-2">{type}</span>
    <span className="text-xs text-gray-600 font-semibold flex-1 text-right pr-1">{count}</span>
    <style jsx>{`
      .tag {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.5),
      inset 5px 3px 5px rgba(255, 255, 255, 0.1),
      inset -1px -10px 10px rgba(54, 59, 70, 0.4);
      }
      .type-name {
        color: var(--color-type-${type.toLowerCase()});
        text-shadow: 0 0 12px var(--color-type-${type.toLowerCase()});
      }
    `}</style>
  </span>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
