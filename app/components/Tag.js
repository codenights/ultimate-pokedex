import React from "react";

export const Tag = ({ children }) => (
  <span>
    {children}

    <style jsx>{`
      span {
        padding: 4px 6px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.15);
        font-size: 1rem;
        text-transform: uppercase;
      }
    `}</style>
  </span>
);
