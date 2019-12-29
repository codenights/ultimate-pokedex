import React from "react";
import Link from "next/link";

export const AppBar = () => (
  <header>
    <Link href="/">
      <a>
        <img src="/img/home.png" alt="Pokedex" />

        <span>Ultimate Pokedex</span>
      </a>
    </Link>

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
        display: inline-flex;
        align-items: center;
      }

      span {
        padding: 15px;
      }
    `}</style>
  </header>
);
