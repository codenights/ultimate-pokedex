import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";

import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia";
import { Tag } from "../Tag";

export const TypeList = connectRefinementList(({ items, refine }) => {
  const hasRefined = items.some(item => item.isRefined);

  return (
    <ul>
      {items.map(type => (
        <li
          key={type.label}
          style={!hasRefined ? {} : { opacity: type.isRefined ? 1 : 0.6 }}
          onClick={() => refine(type.value)}
        >
          <TypeBadgeAlgolia type={type.label} /> <Tag>{type.count}</Tag>
        </li>
      ))}

      <style jsx>{`
        li {
          cursor: pointer;
          padding-bottom: 10px;
        }
      `}</style>
    </ul>
  );
});
