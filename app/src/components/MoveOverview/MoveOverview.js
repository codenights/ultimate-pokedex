import React from "react";

import { getBackgroundColorFromType } from "../../utils/colors";
import { TypeBadge } from "../TypeBadge";

export const MoveOverview = ({ move }) => (
  <header>
    <h1>{move.name}</h1>

    <TypeBadge type={move.type} />

    <style jsx>{`
      header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: ${getBackgroundColorFromType(move.type)};
      }

      h1 {
        font-size: 3.5rem;
        line-height: 1;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 20px 0;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-left-color: transparent;
        border-right-color: transparent;
        margin-bottom: 20px;
      }
    `}</style>
  </header>
);
