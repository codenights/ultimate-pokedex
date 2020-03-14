import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia/TypeBadgeAlgolia";

const typeNames = [
  "Grass",
  "Bug",
  "Electric",
  "Ground",
  "Rock",
  "Normal",
  "Fighting",
  "Fire",
  "Dark",
  "Psychic",
  "Poison",
  "Fairy",
  "Dragon",
  "Ghost",
  "Flying",
  "Water",
  "Ice",
  "Steel",
];

function getTypes({ items, searchState }) {
  return typeNames.map(typeName => {
    const refinement = items.find(x => x.label === typeName);
    const isRefined =
      (refinement && refinement.isRefined) ||
      (searchState.refinementList &&
        searchState.refinementList["types.name"] &&
        searchState.refinementList["types.name"].indexOf(typeName) !== -1);

    return {
      label: typeName,
      value: isRefined ? [] : [typeName],
      count: 0,
      isRefined,
      ...refinement,
    };
  });
}

export const TypeList = connectRefinementList(
  ({ items, refine, searchState }) => {
    // We use a static list because we know all Pokemon types already. We want
    // all of them to show all the time.
    // Adding a single value to the `value` array means that there will be a
    // single value after refinement, which resets any multiple-type refinements.
    const types = getTypes({ items, searchState });

    return (
      <ul>
        {types.map(type => (
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
                value={type.value}
              />
            </label>
          </li>
        ))}
      </ul>
    );
  }
);
