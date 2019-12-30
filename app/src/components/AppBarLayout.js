import React from "react";
import PropTypes from "prop-types";

import { AppBar } from "./AppBar";

export const AppBarLayout = ({ children }) => (
  <div>
    <AppBar />

    {children}

    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow-y: hidden;
      }

      div > :global(:last-child) {
        flex: 1;
        height: 100%;
        overflow-y: scroll;
      }
    `}</style>
  </div>
);

AppBarLayout.propTypes = {
  children: PropTypes.node.isRequired
};
