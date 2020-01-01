import React from "react";

export const TypeIcon = ({ type }) => (
  <span
    className={`inline-block whitespace-no-wrap rounded-full text-center h-5 w-5 bg-type-${type.toLowerCase()}`}
  >
    <svg
      className="fill-current text-gray-900 inline align-baseline"
      width="14"
      viewBox="0 0 512 512"
    >
      <use
        xlinkHref={`/icons/types/${type.toLowerCase()}.svg#${type.toLowerCase()}`}
      ></use>
    </svg>

    <style jsx>{`
      span {
        box-shadow: 0 0 16px var(--color-type-${type.toLowerCase()});
      }
    `}</style>
  </span>
);
