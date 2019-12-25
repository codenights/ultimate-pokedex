import React from "react";

import { fetchAbilityQuery } from "../../queries/fetchAbility";
import { AbilityOverview } from "../../components/AbilityOverview";
import { AbilityDetails } from "../../components/AbilityDetails";
import { AppBarLayout } from "../../components/AppBarLayout";

const AbilityPage = ({ ability }) => {
  return (
    <AppBarLayout>
      <main>
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

AbilityPage.getInitialProps = async ({ query }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  const { abilityId } = query;
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: fetchAbilityQuery(abilityId) })
  });
  const { data } = await response.json();

  return { ability: data.ability };
};

export default AbilityPage;
