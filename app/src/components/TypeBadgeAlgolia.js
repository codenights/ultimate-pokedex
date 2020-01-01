import React from "react";
import PropTypes from "prop-types";
import { TypeIcon } from "./TypeIcon";

export const TypeBadgeAlgolia = ({ type, count }) => (
  <span
    className={`tag w-full flex flex-fill whitespace-no-wrap rounded-full text-center px-2 items-center p-1 my-2`}
  >
    <TypeIcon type={type} />
    <span className="type-name text-md ml-2">{type}</span>
    <span className="text-sm text-gray-900 font-bold flex-1 text-right pr-1">
      {count}
    </span>
    <style jsx>{`
      .tag {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.5),
          inset 1px 1px 0 rgba(255, 255, 255, 0.2),
          inset -1px -2px 0 rgba(34, 39, 50, 0.3);

        background-image: linear-gradient(
          -40deg,
          rgba(75, 79, 92, 0.7) 35%,
          rgba(0, 0, 0, 0.4) 90%,
          var(--color-type-${type.toLowerCase()})
        );
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
