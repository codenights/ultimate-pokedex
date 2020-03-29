import React from "react";
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

AbilityPage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchAbilityQuery(query.abilityId), req, ({ ability }) => ({
    ability,
  }));

export default AbilityPage;
