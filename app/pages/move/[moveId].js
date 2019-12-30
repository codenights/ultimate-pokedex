import React from "react";
import Head from "next/head";
import Error from "next/error";

import { fetchMoveQuery } from "../../src/queries/fetchMove";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { MoveOverview } from "../../src/components/MoveOverview";
import { MoveDetail } from "../../src/components/MoveDetail";
import { executeQuery } from "../../src/queries/executeQuery";

const MoveMove = ({ move, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
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
};

MoveMove.getInitialProps = ({ query, req }) =>
  executeQuery(fetchMoveQuery(query.moveId), req, ({ move }) => ({
    move
  }));

export default MoveMove;
