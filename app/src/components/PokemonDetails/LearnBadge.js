import React from "react";

import { Icons } from "../Icons";

function Badge(learn) {
  switch (learn.method) {
    case "level-up":
      return (
        <span>
          <Icons
            icon="level-up"
            className="inline mr-2 fill-current"
            width="16"
            height="16"
          />
          {learn.level}
        </span>
      );

    case "machine":
      return (
        <span>
          <Icons
            icon="machine"
            className="inline mr-2 fill-current"
            width="16"
            height="16"
          />
          Machine
        </span>
      );

    case "tutor":
      return (
        <span>
          <Icons
            icon="tutor"
            className="inline mr-2 fill-current"
            width="16"
            height="16"
          />
          Tutor
        </span>
      );

    case "egg":
      return (
        <span>
          <Icons
            icon="egg"
            className="inline mr-2 fill-current"
            width="16"
            height="16"
          />
          Egg
        </span>
      );

    case "light-ball-egg":
      return (
        <span title="Using a Light Ball">
          <Icons
            icon="egg"
            className="inline mr-2 fill-current"
            width="16"
            height="16"
          />
          Egg <sup>(?)</sup>
        </span>
      );

    default:
      return learn.method;
  }
}

export const LearnBadge = ({ learn }) => (
  <span className="flex items-center">
    <div className="whitespace-no-wrap text-center">
      <Badge {...learn} />
    </div>
  </span>
);
