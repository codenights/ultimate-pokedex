import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Error from "../_error";
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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const props = await executeQuery(
    fetchTypeQuery(query.typeId),
    req,
    ({ type }) => ({
      type,
    })
  );

  return {
    props,
  };
};

export default TypePage;
