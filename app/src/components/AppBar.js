import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { SearchBox } from "./Search";

export const AppBar = ({ showSearchBox = false }) => (
  <header
    className="fixed flex h-12 w-full inset-x-0 top-0 bg-gray-700 text-gray-900 px-6 z-50 items-center"
    style={{
      backgroundImage:
        "linear-gradient(180deg, rgb(68, 75, 91) 0%, rgb(58, 70, 97) 10%, rgb(46, 55, 75) 30%, rgb(30, 39, 45) 85%,  rgb(38, 40, 67) 100%)",
      boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50), 0 8px 20px 0 rgba(0,0,0,0.30)",
    }}
  >
    <div className="w-1/4">
      <Link href="/">
        <a className="">
          <img src="/logo.svg" alt="Ultimate Pokedex" />
        </a>
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
