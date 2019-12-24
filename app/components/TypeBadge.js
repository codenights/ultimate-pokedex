import React from "react";

export const TypeBadge = ({ type }) => (
  <span>
    {type.name}
    <style jsx>{`
      span {
        display: inline-block;
        border-radius: 4px;
        padding: 4px 12px;
        font-size: 1.2rem;
        background: ${type.color};
        color: #fff;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
        font-family: monospace;
      }
    `}</style>
  </span>
);
