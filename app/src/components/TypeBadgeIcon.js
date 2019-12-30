import React from "react";

export const TypeBadgeIcon = ({ type }) => (
  <span className={`inline-block whitespace-no-wrap rounded-full text-center h-8 w-8 bg-type-${type.toLowerCase()}`}>
    <svg className="fill-current text-gray-900 inline align-text-bottom" width="14" viewBox="0 0 512 512">
      <use xlinkHref={`./icons/types/${type.toLowerCase()}.svg#${type.toLowerCase()}`}></use>
    </svg>
  </span>
);
