import React from "react";

export const AbilityOverview = ({ ability }) => (
  <header>
    <h1>{ability.name}</h1>

    <style jsx>{`
      header {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #76e;
      }

      h1 {
        font-size: 3.5rem;
        line-height: 1;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        padding: 20px 0;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-left-color: transparent;
        border-right-color: transparent;
      }
    `}</style>
  </header>
);
