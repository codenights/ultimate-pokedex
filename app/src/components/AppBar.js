import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { SearchBox } from "react-instantsearch-dom";

export const AppBar = ({ showSearchBox = false }) => (
  <header className="fixed flex h-12 w-full inset-x-0 top-0 bg-gray-700 text-gray-900 px-6 z-50 items-center">
    <div className="w-1/4">
      <Link href="/">
        <a className="h-6 font-bold uppercase">Ultimate Pokedex</a>
      </Link>
    </div>

    {showSearchBox && (
      <div className="w-3/4">
        <SearchBox translations={{ placeholder: "Search Pokedex" }} />

        <style global jsx>{`
          .ais-SearchBox {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            color: #fff;
          }

          .ais-SearchBox-form {
            width: 100%;
          }

          .ais-SearchBox-input {
            padding: 10px 40px;
            width: 100%;
            box-sizing: border-box;
            font: inherit;
            appearance: none;
            border-radius: 8px;
            height: 38px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            background: linear-gradient(
              40deg,
              rgba(255, 255, 255, 0.24),
              rgba(255, 255, 255, 0.1)
            );
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
              inset 1px 1px 1px rgba(255, 255, 255, 0.1);
          }

          .ais-SearchBox-input:focus {
            outline: none;
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3),
              inset 1px 1px 1px rgba(255, 255, 255, 0.1),
              inset 0 0 2px 0 rgba(255, 255, 255, 0.2),
              inset 0 0 10px rgba(255, 255, 255, 0.2);
          }

          .ais-SearchBox-input::-webkit-search-decoration,
          .ais-SearchBox-input::-webkit-search-cancel-button,
          .ais-SearchBox-input::-webkit-search-results-button,
          .ais-SearchBox-input::-webkit-search-results-decoration {
            display: none;
          }

          .ais-SearchBox-submit {
            position: absolute;
            display: flex;
            justify-content: center;
            width: 40px;
            height: 100%;
            top: 0;
            left: 0;
          }

          .ais-SearchBox-submitIcon {
            fill: #fff;
            width: 14px;
            height: 14px;
          }

          .ais-SearchBox-reset {
            position: absolute;
            display: flex;
            justify-content: center;
            width: 40px;
            height: 100%;
            right: 0;
            top: 0;
          }

          .ais-SearchBox-reset[hidden] {
            display: none;
          }

          .ais-SearchBox-resetIcon {
            fill: #fff;
            width: 10px;
            height: 10px;
          }
        `}</style>
      </div>
    )}
  </header>
);

AppBar.propTypes = {
  showSearchBox: PropTypes.bool
};
