import React from "react";

import { fetchAbilityQuery } from "../../src/queries/fetchAbility";
import { AbilityOverview } from "../../src/components/AbilityOverview";
import { AbilityDetails } from "../../src/components/AbilityDetails";
import { AppBarLayout } from "../../src/components/AppBarLayout";

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

AbilityPage.getInitialProps = async ({ query, req }) => {
  // TODO: fix this
  const baseUrl = req ? `http://${req.headers.host}` : "";
  const { abilityId } = query;
  const response = await fetch(`${baseUrl}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: fetchAbilityQuery(abilityId) })
  });
  const { data } = await response.json();

  return { ability: data.ability };
};

export default AbilityPage;
