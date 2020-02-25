import React from "react";
import Head from "next/head";
import Error from "next/error";

import { fetchMoveQuery } from "../../src/queries/fetchMove";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { MoveDetails } from "../../src/components/MoveDetails";
import { executeQuery } from "../../src/queries/executeQuery";
import {
  ColumnLayout,
  LeftPane,
  LeftPaneTitle,
} from "../../src/components/ColumnLayout/ColumnLayout";
import { TypeBadge } from "../../src/components/TypeBadge";

const MovePage = ({ move, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <Head>
        <title>{move.name} | Ultimate Pokedex</title>
      </Head>

      <main>
        <ColumnLayout>
          <LeftPane>
            <LeftPaneTitle>{move.name}</LeftPaneTitle>
            <TypeBadge type={move.type} />
          </LeftPane>

          <MoveDetails move={move} />
        </ColumnLayout>
      </main>
    </AppBarLayout>
  );
};

MovePage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchMoveQuery(query.moveId), req, ({ move }) => ({
    move,
  }));

export default MovePage;
