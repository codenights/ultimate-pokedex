import React from "react";
import PropTypes from "prop-types";

import { AppBar } from "./AppBar";

export const AppBarLayout = ({ children }) => (
  <div className="w-full pt-12">
    <AppBar />
    {children}
  </div>
);

AppBarLayout.propTypes = {
  children: PropTypes.node.isRequired
};
