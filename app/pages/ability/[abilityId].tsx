import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import Error from "../_error";
import { fetchAbilityQuery } from "../../src/queries/fetchAbility";
import { AbilityDetails } from "../../src/components/AbilityDetails";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { executeQuery } from "../../src/queries/executeQuery";
import {
  ColumnLayout,
  LeftPane,
  LeftPaneTitle,
} from "../../src/components/ColumnLayout/ColumnLayout";

const AbilityPage = ({ ability, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <Head>
        <title>{ability.name} | Ultimate Pokedex</title>
      </Head>

      <main>
        <ColumnLayout>
          <LeftPane>
            <LeftPaneTitle>{ability.name}</LeftPaneTitle>
          </LeftPane>

          <AbilityDetails ability={ability} />
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
    fetchAbilityQuery(query.abilityId),
    req,
    ({ ability }) => ({
      ability,
    })
  );

  return {
    props,
  };
};

export default AbilityPage;
