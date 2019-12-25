import React from "react";

export const AppBar = () => (
  <header>
    <a href="/">
      <img src="/img/home.png" alt="Pokedex" />

      <span>Ultimate Pokedex</span>
    </a>

    <style jsx>{`
      header {
        padding: 5px 20px;
        background: #fff;
        border-bottom: 1px solid #ddd;
      }

      img {
        max-width: 40px;
        transform: rotate(90deg);
      }

      a {
        text-decoration: none;
        font-weight: bold;
        color: inherit;
        display: flex;
        align-items: center;
      }

      span {
        padding: 15px;
      }
    `}</style>
  </header>
);
