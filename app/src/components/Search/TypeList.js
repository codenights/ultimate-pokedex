import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia";

export const TypeList = connectRefinementList(({ items, refine }) => {
  return (
    <ul>
      {items.map(type => (
        <li key={type.label}>
          <label htmlFor={type.label}>
            <input
              className="hidden"
              type="checkbox"
              id={type.label}
              checked={type.isRefined}
              onChange={() => refine(type.value)}
            />

            <TypeBadgeAlgolia
              active={type.isRefined}
              type={type.label}
              count={type.count}
            />
          </label>
        </li>
      ))}
    </ul>
  );
});
