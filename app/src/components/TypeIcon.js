import React from "react";
import { Icons } from "./Icons";

export const TypeIcon = ({ type }) => (
  <span
    className={`inline-block whitespace-no-wrap rounded-full text-center h-5 w-5 bg-type-${type.toLowerCase()}`}
  >
    <Icons icon={type} className="fill-current text-gray-900 inline align-baseline" width="14" height="14" />
    <style jsx>{`
      span {
        box-shadow: 0 0 12px var(--color-type-${type.toLowerCase()});
      }
    `}</style>
  </span>
);
