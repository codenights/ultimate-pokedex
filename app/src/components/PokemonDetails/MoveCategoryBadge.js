import React from "react";
import { Icons } from "../Icons";

export const MoveCategoryBadge = ({ category }) => (
  <span className="flex items-center">
  <div className={`whitespace-no-wrap rounded-full text-center h-5 w-5 text-move-category-${category}`}>
    <Icons
        icon={category}
        className="fill-current inline align-baseline mr-2"
        width="16"
        height="16"
      />
    {category}
    </div>
  </span>
);
