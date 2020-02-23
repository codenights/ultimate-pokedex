import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { SearchBox } from "./Search";

export const AppBar = ({ showSearchBox = false }) => (
  <header className="fixed flex h-12 w-full inset-x-0 top-0 bg-gray-700 text-gray-900 px-6 z-50 items-center">
    <div className="w-1/4">
      <Link href="/">
        <a className="h-6 font-bold uppercase">Ultimate Pokedex</a>
      </Link>
    </div>

    {showSearchBox && (
      <div className="w-3/4">
        <SearchBox />
      </div>
    )}
  </header>
);

AppBar.propTypes = {
  showSearchBox: PropTypes.bool,
};
