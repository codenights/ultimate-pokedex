import React from "react";

export const TypeBadge = ({ type }) => (
  <span>
    {type}
    <style jsx>{`
      span {
        display: inline-block;
        border-radius: 4px;
        padding: 4px 12px;
        font-size: 1rem;
        background: blue;
        color: #fff;
        font-weight: bold;
        font-family: monospace;
      }
    `}</style>
  </span>
);
