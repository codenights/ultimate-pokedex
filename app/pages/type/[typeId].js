import React from "react";
import Head from "next/head";
import Error from "next/error";

import { fetchTypeQuery } from "../../src/queries/fetchType";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { executeQuery } from "../../src/queries/executeQuery";
import { TypeDetails } from "../../src/components/TypeDetails";
import {
  ColumnLayout,
  LeftPane,
  LeftPaneTitle,
} from "../../src/components/ColumnLayout/ColumnLayout";

const TypePage = ({ type, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <Head>
        <title>{type.name} | Ultimate Pokedex</title>
      </Head>

      <main>
        <ColumnLayout>
          <LeftPane>
            <LeftPaneTitle>{type.name}</LeftPaneTitle>
          </LeftPane>

          <TypeDetails type={type} />
        </ColumnLayout>
      </main>
    </AppBarLayout>
  );
};

TypePage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchTypeQuery(query.typeId), req, ({ type }) => ({
    type,
  }));

export default TypePage;
