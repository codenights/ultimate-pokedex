import React from "react";
import PropTypes from "prop-types";

import { AppBar } from "./AppBar";

export const AppBarLayout = ({ children }) => (
  <div className="bg-gray-800 h-screen w-full overflow-y-auto pt-16">
    <AppBar />
    {children}
  </div>
);

AppBarLayout.propTypes = {
  children: PropTypes.node.isRequired
};
