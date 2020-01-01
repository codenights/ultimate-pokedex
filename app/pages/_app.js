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

        <style global jsx>{`
          html,
          body,
          div,
          span,
          applet,
          object,
          iframe,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          blockquote,
          pre,
          a,
          abbr,
          acronym,
          address,
          big,
          cite,
          code,
          del,
          dfn,
          em,
          img,
          ins,
          kbd,
          q,
          s,
          samp,
          small,
          strike,
          strong,
          sub,
          sup,
          tt,
          var,
          b,
          u,
          i,
          center,
          dl,
          dt,
          dd,
          ol,
          ul,
          li,
          fieldset,
          form,
          label,
          legend,
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
          article,
          aside,
          canvas,
          details,
          embed,
          figure,
          figcaption,
          footer,
          header,
          hgroup,
          menu,
          nav,
          output,
          ruby,
          section,
          summary,
          time,
          mark,
          audio,
          video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
          /* HTML5 display-role reset for older browsers */
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          menu,
          nav,
          section {
            display: block;
          }
          body {
            line-height: 1;
          }
          ol,
          ul {
            list-style: none;
          }
          blockquote,
          q {
            quotes: none;
          }
          blockquote:before,
          blockquote:after,
          q:before,
          q:after {
            content: "";
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }

          html {
            font-size: 62.5%;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 1.6rem;
            min-height: 100vh;
            background: #fafafa;
            color: #373737;
          }

          .visually-hidden {
            position: absolute !important;
            height: 1px;
            width: 1px;
            overflow: hidden;
            clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
            clip: rect(1px, 1px, 1px, 1px);
            white-space: nowrap; /* added line */
          }
        `}</style>
      </ShinyMode>
    );
  }
}

export default UltimatePokedexApp;
