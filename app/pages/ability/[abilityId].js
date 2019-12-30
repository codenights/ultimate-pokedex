import React from "react";
import Error from "next/error";

import { fetchAbilityQuery } from "../../src/queries/fetchAbility";
import { AbilityOverview } from "../../src/components/AbilityOverview";
import { AbilityDetails } from "../../src/components/AbilityDetails";
import { AppBarLayout } from "../../src/components/AppBarLayout";
import { executeQuery } from "../../src/queries/executeQuery";
import Head from "next/head";

const AbilityPage = ({ ability, statusCode }) => {
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <AppBarLayout>
      <main>
        <Head>
          <title>{ability.name} | Ultimate Pokedex</title>
        </Head>
        <AbilityOverview ability={ability} />

        <AbilityDetails ability={ability} />

        <style jsx>{`
          main {
          }

          @media (min-width: 800px) {
            main {
              display: grid;
              grid-template-columns: 1fr 2fr;
              height: 100%;
              overflow: hidden;
            }
          }
        `}</style>
      </main>
    </AppBarLayout>
  );
};

AbilityPage.getInitialProps = ({ query, req }) =>
  executeQuery(fetchAbilityQuery(query.abilityId), req, ({ ability }) => ({
    ability
  }));

export default AbilityPage;
