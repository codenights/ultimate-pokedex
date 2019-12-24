import React from "react";
import { TypeBadge } from "../TypeBadge";

export const Types = props => (
  <ul>
    {props.types.map(type => (
      <li key={type.id}>
        <TypeBadge type={type} />
      </li>
    ))}

    <style jsx>{`
      ul {
        display: flex;
        padding: 20px 0;
      }

      li + li {
        margin-left: 10px;
      }
    `}</style>
  </ul>
);
