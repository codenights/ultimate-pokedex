import React from "react";
import App from "next/app";
import Head from "next/head";

import { ShinyMode } from "../src/components/ShinyMode";
import { Router } from "next/router";

class UltimatePokedexApp extends App {
  state = { isLoading: false };

  constructor() {
    super();

    Router.events.on("routeChangeStart", this.onRouteChange);
    Router.events.on("routeChangeComplete", this.onRouteComplete);
    Router.events.on("routeChangeError", this.onRouteComplete);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.onRouteChange);
    Router.events.off("routeChangeComplete", this.onRouteComplete);
    Router.events.off("routeChangeError", this.onRouteComplete);
  }

  onRouteChange = () => {
    this.timeout = setTimeout(() => {
      this.setState({ isLoading: true });
    }, 400);
  };

  onRouteComplete = () => {
    this.setState({ isLoading: false });

    clearTimeout(this.timeout);
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ShinyMode>
        <Head>
          <link rel="icon" id="favicon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />

        {this.state.isLoading && (
          <div className="flex fixed z-100 top-0 right-0 left-0 bottom-0">
            <img src="/img/pokeball-loader.gif" alt="Pokeball spinner" />
          </div>
        )}

        <style jsx>{`
          div {
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>

      </ShinyMode>
    );
  }
}

export default UltimatePokedexApp;
