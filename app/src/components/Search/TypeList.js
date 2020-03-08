import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import { TypeBadgeAlgolia } from "../TypeBadgeAlgolia/TypeBadgeAlgolia";

export const TypeList = connectRefinementList(({ items, refine }) => {
  const isSecondType = items.filter(x => x.isRefined).length === 1;

  // We use a static list because we know all Pokemon types already. We want
  // all of them to show all the time.
  // Adding a single value to the `value` array means that there will be a
  // single value after refinement, which resets any multiple-type refinements.
  const types = [
    {
      label: "Grass",
      value: ["Grass"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Grass"),
    },
    {
      label: "Bug",
      value: ["Bug"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Bug"),
    },
    {
      label: "Electric",
      value: ["Electric"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Electric"),
    },
    {
      label: "Ground",
      value: ["Ground"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Ground"),
    },
    {
      label: "Rock",
      value: ["Rock"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Rock"),
    },
    {
      label: "Normal",
      value: ["Normal"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Normal"),
    },
    {
      label: "Fighting",
      value: ["Fighting"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Fighting"),
    },
    {
      label: "Fire",
      value: ["Fire"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Fire"),
    },
    {
      label: "Dark",
      value: ["Dark"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Dark"),
    },
    {
      label: "Psychic",
      value: ["Psychic"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Psychic"),
    },
    {
      label: "Poison",
      value: ["Poison"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Poison"),
    },
    {
      label: "Fairy",
      value: ["Fairy"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Fairy"),
    },
    {
      label: "Dragon",
      value: ["Dragon"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Dragon"),
    },
    {
      label: "Ghost",
      value: ["Ghost"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Ghost"),
    },
    {
      label: "Flying",
      value: ["Flying"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Flying"),
    },
    {
      label: "Water",
      value: ["Water"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Water"),
    },
    {
      label: "Ice",
      value: ["Ice"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Ice"),
    },
    {
      label: "Steel",
      value: ["Steel"],
      count: 0,
      isRefined: false,
      ...items.find(x => x.label === "Steel"),
    },
  ];

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
              isSecondType={isSecondType && type.count > 0}
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
