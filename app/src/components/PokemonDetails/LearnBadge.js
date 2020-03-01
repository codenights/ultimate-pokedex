import React from "react";
import { Icons } from "../Icons";

function capitalize(value) {
  return (
    value
      .toString()
      .charAt(0)
      .toUpperCase() + value.toString().slice(1)
  );
}

function getLearnLabel(learn) {
  switch (learn.method) {
    case "level-up":
      return `${learn.level}`;
    default:
      return learn.method;
  }
}

export const LearnBadge = ({ learn }) => (
  <span className="flex items-center">
    <div className="whitespace-no-wrap text-center h-5 w-5">
      <Icons
        icon={learn.method}
        className={`inline mr-2 fill-current`}
        width="16"
        height="16"
      />
      {capitalize(getLearnLabel(learn))}
    </div>
  </span>
);
