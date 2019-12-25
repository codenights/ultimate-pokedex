import React from "react";

export const PokemonHeader = props => (
  <header>
    <img alt={`${props.name} sprite`} src={props.src} />
    <h1>{props.name}</h1>

    <style jsx>{`
      header {
        text-align: center;
      }

      img {
        width: 100%;
        max-width: 350px;
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
