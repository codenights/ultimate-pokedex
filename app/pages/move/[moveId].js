import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

import { fetchMoveQuery } from "../../src/queries/fetchMove";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { MoveOverview } from "../../src/components/MoveOverview";
import { MoveDetail } from "../../src/components/MoveDetail";

const MoveMove = ({ move }) => (
  <AppBarLayout>
    <main>
      <Head>
        <title>{move.name} | Ultimate Pokedex</title>
      </Head>

      <MoveOverview move={move} />

      <MoveDetail move={move} />
    </main>

    <style jsx>{`
      main {
        overflow-y: auto;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
      }

      @media (min-width: 800px) {
        main {
          overflow: hidden;
          grid-template-columns: 1fr 2fr;
        }
      }
    `}</style>
  </AppBarLayout>
);

MoveMove.getInitialProps = async ({ query, req }) => {
  const { moveId } = query;
  const baseUrl = req ? `http://${req.headers.host}` : "";
  const response = await fetch(`${baseUrl}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: fetchMoveQuery(moveId) })
  });
  const { data } = await response.json();

  return { move: data.move };
};

export default MoveMove;
