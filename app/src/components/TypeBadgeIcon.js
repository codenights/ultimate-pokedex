import React from "react";

export const TypeBadgeIcon = ({ type }) => (
  <span className={`inline-block whitespace-no-wrap rounded-full text-center h-8 w-8 bg-type-${type.toLowerCase()}`}>
    <img className="inline align-text-bottom" src={`./icons/types/${type.toLowerCase()}.svg`} width="12"/>
  </span>
);
