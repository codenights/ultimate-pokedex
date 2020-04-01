import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-dom";

import { TypeRefinement } from "./TypeRefinement";
import { StatRefinement } from "./StatRefinement";
import { RefinementHeader } from "./RefinementHeader";
import { RefinementItem, RefinementCard } from "./style";

export const CurrentRefinements = connectCurrentRefinements(props => {
  if (props.items.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap pt-8 px-3">
      {props.items.map(item => (
        <CurrentRefinement
          key={item.attribute}
          refine={props.refine}
          {...item}
        />
      ))}
    </ul>
  );
});

function CurrentRefinement(props) {
  console.log(props.attribute);

  if (props.attribute === "types.name") {
    return props.items.map(type => (
      <TypeRefinement key={type.label} {...type} refine={props.refine} />
    ));
  }

  if (props.attribute === "stats.hp") {
    return <StatRefinement title="HP" imageName="hp" {...props} />;
  }

  if (props.attribute === "stats.attack") {
    return <StatRefinement title="Attack" imageName="attack" {...props} />;
  }

  if (props.attribute === "stats.defense") {
    return <StatRefinement title="Defense" imageName="defense" {...props} />;
  }

  if (props.attribute === "stats.specialAttack") {
    return (
      <StatRefinement title="S.Attack" imageName="special-attack" {...props} />
    );
  }

  if (props.attribute === "stats.specialDefense") {
    return (
      <StatRefinement
        title="S.Defense"
        imageName="special-defense"
        {...props}
      />
    );
  }

  if (props.attribute === "stats.speed") {
    return <StatRefinement title="Speed" imageName="speed" {...props} />;
  }

  return null;
}
