import React from "react";

import { fetchAbilityQuery } from "../../queries/fetchAbility";
import { AbilityOverview } from "../../components/AbilityOverview";
import { AbilityDetails } from "../../components/AbilityDetails";

const AbilityPage = ({ ability }) => {
  return (
    <main>
      <AbilityOverview ability={ability} />

      <AbilityDetails ability={ability} />

      <style jsx>{`
        main {
          display: grid;
          grid-template-columns: 1fr 2fr;
          height: 100vh;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

AbilityPage.getInitialProps = async ({ query }) => {
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
