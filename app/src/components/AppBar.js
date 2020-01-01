import React from "react";
import Link from "next/link";

export const AppBar = () => (
  <header className="fixed flex h-12 w-full inset-x-0 top-0 bg-gray-700 text-gray-900 px-6 z-50 items-center">
    <Link href="/">
      <a className="h-6 font-bold uppercase">
        Ultimate Pokedex
      </a>
    </Link>
  </header>
);
