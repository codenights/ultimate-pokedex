import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-dom";

import { TypeRefinement } from "./TypeRefinement";

export const CurrentRefinements = connectCurrentRefinements(props => {
  if (props.items.length === 0) {
    return null;
  }

  const items = props.items.filter(item => item.items);

  return (
    <ul className="flex pt-8 px-3">
      {items.map(item =>
        item.items.map(refinement => {
          return (
            <CurrentRefinement
              key={refinement.label}
              {...refinement}
              attribute={item.attribute}
              refine={props.refine}
            />
          );
        })
      )}
    </ul>
  );
});

function CurrentRefinement(props) {
  if (props.attribute === "types.name") {
    return <TypeRefinement {...props} />;
  }

  return null;
}
