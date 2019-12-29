import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Router } from "next/router";

export const PokemonLink = ({ pokemonId, children }) => {
  const timeoutRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const onRouteChange = () => {
    timeoutRef.current = setTimeout(() => {
      setLoading(true);
    }, 400);
  };
  const onRouteComplete = () => {
    setLoading(false);
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", onRouteChange);
    Router.events.on("routeChangeComplete", onRouteComplete);
    Router.events.on("routeChangeError", onRouteComplete);

    return () => {
      Router.events.off("routeChangeStart", onRouteChange);
      Router.events.off("routeChangeComplete", onRouteComplete);
      Router.events.off("routeChangeError", onRouteComplete);
    };
  }, [onRouteChange]);

  return (
    <>
      <Link href="/pokemon/[nationalId]" as={`/pokemon/${pokemonId}`}>
        <a>{children}</a>
      </Link>

      {isLoading && (
        <div>
          <img src="/img/pokeball-loader.gif" alt="Pokeball spinner" />
        </div>
      )}

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};
