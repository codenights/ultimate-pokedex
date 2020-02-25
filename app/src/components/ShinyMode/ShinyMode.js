import React, { createContext, useState, useEffect, useContext } from "react";

const ShinyContext = createContext(false);

export const useShiny = (spriteUrl, spriteShinyUrl) => {
  const isShiny = useContext(ShinyContext);

  return isShiny ? spriteShinyUrl : spriteUrl;
};

export const ShinyMode = ({ children }) => {
  const [isShiny, setShiny] = useState(false);

  useEffect(() => {
    let isWaitingForSecondKeyDown = false;
    let lastKeyDownTimerId = null;

    // This turns the Pokédex in shiny mode on double press on the Shift key.
    function onKeyDown(event) {
      const element = event.target;
      const tagName = element.tagName;

      // We don't trigger the shiny mode when typing in text fields
      if (
        element.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "SELECT" ||
        tagName === "TEXTAREA"
      ) {
        return;
      }

      if (
        event.key === "Shift" &&
        event.altKey === false &&
        event.ctrlKey === false &&
        event.metaKey === false
      ) {
        clearTimeout(lastKeyDownTimerId);

        if (isWaitingForSecondKeyDown) {
          setShiny(prevValue => !prevValue);
          isWaitingForSecondKeyDown = false;
        } else {
          isWaitingForSecondKeyDown = true;
          lastKeyDownTimerId = setTimeout(() => {
            isWaitingForSecondKeyDown = false;
          }, 1000);
        }
      } else {
        // If another key is pressed, we reset the counter
        isWaitingForSecondKeyDown = false;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <ShinyContext.Provider value={isShiny}>{children}</ShinyContext.Provider>
  );
};
