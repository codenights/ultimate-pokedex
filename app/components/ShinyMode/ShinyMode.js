import React, { createContext, useState, useEffect, useContext } from "react";

const shinyContext = createContext(false);

export const useShiny = (spriteUrl, spriteShinyUrl) => {
  const isShiny = useContext(shinyContext);

  return isShiny ? spriteShinyUrl : spriteUrl;
};

export const ShinyMode = ({ children }) => {
  const [isShiny, setShiny] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (
        event.key === "Alt" &&
        event.ctrlKey === false &&
        event.shiftKey === false &&
        event.metaKey === false
      ) {
        setShiny(prevValue => !prevValue);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <shinyContext.Provider value={isShiny}>{children}</shinyContext.Provider>
  );
};
