import React from "react";
import Link from "next/link";

export const AppBar = () => (
  <header className="w-full fixed top-0 bg-gray-700 text-black font-bold uppercase px-6 z-50">
    <Link href="/">
      <a className="inline-flex">
        <img className="w-16 mr-4" src="/img/home.png" alt="Pokedex" />
        <span>Ultimate Pokedex</span>
      </a>
    </Link>

    <style jsx>{`
      img {
        transform: rotate(90deg);
      }
      a {
        align-items: center;
      }
    `}</style>
  </header>
);
