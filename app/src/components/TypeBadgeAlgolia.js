import React from "react";
import PropTypes from "prop-types";
import { TypeIcon } from "./TypeIcon";

export const TypeBadgeAlgolia = ({ type, count, active }) => (
  <span
    className={"tag w-full flex flex-fill whitespace-no-wrap rounded-full text-center px-2 items-center p-1 my-2" + (active?' active':'')}
  >
    <TypeIcon type={type} />
    <span className="type-name text-md ml-2">{type}</span>
    <span className="type-count text-sm text-gray-600 flex-1 text-right pr-1">
      {count}
    </span>
    <style jsx>{`
      .tag {
        box-shadow:
          1px 2px 3px rgba(0, 0, 0, 0.3),
          inset 1px 1px 1px rgba(255, 255, 255, 0.1);
        background-image: linear-gradient(
          -40deg,
          rgba(75, 79, 92, 0.3) 15%,
          rgba(0, 0, 0, 0.4) 90%,
          var(--color-type-${type.toLowerCase()})
        );
      }
      .type-name {
        color: var(--color-type-${type.toLowerCase()});
        text-shadow: 0 0 12px var(--color-type-${type.toLowerCase()});
      }
      .tag.active {
        box-shadow:
          1px 2px 3px rgba(0, 0, 0, 0.3),
          inset 1px 1px 1px rgba(255, 255, 255, 0.1);
        background-image: linear-gradient(
          45deg,
          rgba(75, 79, 92, 0.3) 45%,
          var(--color-type-${type.toLowerCase()})
        );
      }
      .active .type-name {
        color: var(--color-type-${type.toLowerCase()});
        text-shadow: 0 0 12px var(--color-type-${type.toLowerCase()});
      }
      .tag:hover .type-count {
        color: rgb(163, 188, 210);
      }
      .tag.active .type-count {
        color: rgb(25, 29, 42);
        font-weight: 600;
      }
      .tag:hover {
        cursor: pointer;
        box-shadow:
          inset 0 0 2px 0 var(--color-type-${type.toLowerCase()}),
          inset 0 0 10px var(--color-type-${type.toLowerCase()});
      }
    `}</style>
  </span>
);

TypeBadgeAlgolia.propTypes = {
  type: PropTypes.string.isRequired
};
