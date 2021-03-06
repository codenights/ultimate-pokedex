import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Error from "../_error";
import { executeQuery } from "../../src/queries/executeQuery";
import { fetchEggGroup } from "../../src/queries/fetchEggGroup";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import {
  ColumnLayout,
  LeftPane,
  LeftPaneTitle,
} from "../../src/components/ColumnLayout/ColumnLayout";
import { EggGroupDetails } from "../../src/components/EggGroupDetails";

const EggGroupPage = ({ eggGroup, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <Head>
        <title>{eggGroup.name} | Ultimate Pokedex</title>
      </Head>

      <main>
        <ColumnLayout>
          <LeftPane>
            <LeftPaneTitle>{eggGroup.name}</LeftPaneTitle>
          </LeftPane>

          <EggGroupDetails eggGroup={eggGroup} />
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
    fetchEggGroup(query.eggGroupId),
    req,
    ({ eggGroup }) => ({
      eggGroup,
    })
  );

  return {
    props,
  };
};

export default EggGroupPage;
