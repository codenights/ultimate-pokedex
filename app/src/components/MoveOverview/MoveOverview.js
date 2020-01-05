import React from "react";

import { getBackgroundColorFromType } from "../../utils/colors";
import { TypeBadge } from "../TypeBadge";

export const MoveOverview = ({ move }) => (
  <header className="hidden top-0 inset-x-0 pt-16 bg-gray-800 h-auto z-90 w-full lg:overflow-y-visible lg:pt-0 lg:w-2/5 lg:block xl:w-2/6 flex text-center">
    <h1 className="text-3xl">{move.name}</h1>
    <TypeBadge type={move.type} />
  </header>
);
