import React from "react";
import { TypeBadge } from "../TypeBadge";

export const Types = props => (
  <ul>
    {props.types.map(type => (
      <li className="inline-block mr-2" key={type.id}>
        <TypeBadge type={type} />
      </li>
    ))}
  </ul>
);
