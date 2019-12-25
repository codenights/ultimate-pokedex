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
              <TypeBadgeAlgolia type={type.label} />
            </span>
          </label>

          <Tag>{type.count}</Tag>
        </li>
      ))}

      <style jsx>{`
        li {
          padding-bottom: 10px;
        }

        label {
          cursor: pointer;
        }

        input:focus + span {
          outline: 5px auto -webkit-focus-ring-color;
        }

        input + span {
          opacity: ${hasRefined ? 0.6 : 1};
        }

        input:checked + span {
          opacity: 1;
        }
      `}</style>
    </ul>
  );
});
