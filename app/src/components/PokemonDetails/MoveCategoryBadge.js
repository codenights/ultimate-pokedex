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

export const MoveCategoryBadge = ({ category }) => (
  <span className="flex items-center">
    <div className="whitespace-no-wrap text-center h-5 w-5">
      <Icons
        icon={category}
        className={`inline mr-2 text-move-category-${category} fill-current`}
        width="16"
        height="16"
      />
      {capitalize(category)}
    </div>
  </span>
);
