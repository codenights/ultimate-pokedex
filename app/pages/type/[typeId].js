import React from "react";
import Head from "next/head";
import Error from "next/error";

import { fetchTypeQuery } from "../../src/queries/fetchType";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { executeQuery } from "../../src/queries/executeQuery";

const TypePage = ({ type, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <main>
        <Head>
          <title>{type.name} | Ultimate Pokedex</title>
        </Head>

        <h1>{type.name}</h1>
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

TypePage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchTypeQuery(query.typeId), req, ({ type }) => ({
    type
  }));

export default TypePage;
