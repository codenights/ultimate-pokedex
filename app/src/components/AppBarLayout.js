import React from "react";
import PropTypes from "prop-types";

import { AppBar } from "./AppBar";

export const AppBarLayout = ({ showSearchBox, children }) => (
  <div className="w-full pt-12">
    <AppBar showSearchBox={showSearchBox} />
    {children}
  </div>
);

AppBarLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showSearchBox: PropTypes.bool,
};
