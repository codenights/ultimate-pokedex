import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";

import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia";
import { Tag } from "../Tag";

export const TypeList = connectRefinementList(({ items, refine }) => {
  const hasRefined = items.some(item => item.isRefined);

  return (
    <ul>
      {items.map(type => (
        <li key={type.label}>
          <label htmlFor={type.label}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={type.label}
              checked={type.isRefined}
              onChange={() => refine(type.value)}
            />

            <span>
              <TypeBadgeAlgolia type={type.label} /> <Tag>{type.count}</Tag>
            </span>
          </label>
        </li>
      ))}

      <style jsx>{`
        li {
          padding-bottom: 10px;
        }
        
        label {
          cursor: pointer;
        }

        input + span {
          opacity: 0.6;
        }

        input:checked + span {
          opacity: 1;
        }
      `}</style>
    </ul>
  );
});
