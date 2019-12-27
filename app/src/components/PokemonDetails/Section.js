import React from "react";

export const Section = ({ children, style }) => (
  <section style={style}>
    {children}

    <style jsx>{`
      section {
        padding: 20px 0;
      }
    `}</style>
  </section>
);
