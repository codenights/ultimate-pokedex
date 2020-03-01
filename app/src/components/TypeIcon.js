import React from "react";
import { Icons } from "./Icons";

export const TypeIcon = ({ type }) => (
  <span className="inline-block whitespace-no-wrap rounded-full text-center h-5 w-5">
    <Icons
      icon={type}
      className={`fill-current inline align-baseline text-type-${type.toLowerCase()}`}
      width="18"
      height="18"
    />
  </span>
);
