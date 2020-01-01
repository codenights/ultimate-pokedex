import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";

import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia";
import { Tag } from "../Tag";

export const TypeList = connectRefinementList(({ items, refine }) => {
  const hasRefined = items.some(item => item.isRefined);

  return (
    <ul>
      {items.map(type => (
        <li className="mb-4 whitespace-no-wrap" key={type.label}>
          <label htmlFor={type.label}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={type.label}
              checked={type.isRefined}
              onChange={() => refine(type.value)}
            />

            <span className="mr-4">
              <TypeBadgeAlgolia type={type.label} />
            </span>
          </label>

          <Tag>{type.count}</Tag>
        </li>
      ))}
    </ul>
  );
});
