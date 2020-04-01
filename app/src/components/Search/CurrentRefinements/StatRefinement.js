import React from "react";

import { RefinementHeader } from "./RefinementHeader";
import { RefinementCard, RefinementItem } from "./style";

export function StatRefinement(props) {
  return (
    <RefinementItem>
      <RefinementCard>
        <RefinementHeader onRemove={() => props.refine(props.value)}>
          {props.title}
          <img
            src={`/icons/stats/${props.imageName}.svg`}
            className="ml-2"
            width={18}
            height={18}
          />
          <span className="text-gray-500 ml-2">
            {props.currentRefinement.min} – {props.currentRefinement.max}
          </span>
        </RefinementHeader>
      </RefinementCard>
    </RefinementItem>
  );
}
