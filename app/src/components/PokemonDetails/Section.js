import React from "react";

export const Section = ({ children, style }) => (
  <section className="py-4" style={style}>
    {children}
  </section>
);
