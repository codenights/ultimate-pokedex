import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

import { Section } from "./Section";

const getDataFromPokemon = pokemon =>
  Object.keys(pokemon.stats).map(statName => ({
    stat: statName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, str => str.toUpperCase()),
    value: pokemon.stats[statName]
  }));

const getDotColor = ({ value }) => {
  if (value <= 70) {
    return "red";
  } else if (value <= 90) {
    return "orange";
  } else if (value <= 110) {
    return "yellow";
  } else if (value <= 150) {
    return "green";
  } else {
    return "cyan";
  }
};

const getOverallColor = stats => {
  const totalBaseStat = Object.values(stats).reduce((a, b) => a + b, 0);

  if (totalBaseStat <= 300) {
    return "red";
  } else if (totalBaseStat <= 400) {
    return "orange";
  } else if (totalBaseStat <= 500) {
    return "yellow";
  } else if (totalBaseStat <= 650) {
    return "green";
  } else {
    return "cyan";
  }
};

export const Stats = ({ pokemon }) => (
  <Section style={{ height: 400 }}>
    <h2>Statistics</h2>

    <ResponsiveRadar
      data={getDataFromPokemon(pokemon)}
      keys={["value"]}
      indexBy="stat"
      maxValue="auto"
      curve="linearClosed"
      borderWidth={2}
      margin={{ top: 50, bottom: 80, left: 100, right: 100 }}
      gridLevels={5}
      gridShape="circular"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={10}
      dotBorderWidth={2}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={() => getOverallColor(pokemon.stats)}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={false}
      dotColor={getDotColor}
      dotBorderColor="rgba(0, 0, 0, .3)"
      borderColor="rgba(0, 0, 0, .3)"
    />

    <style jsx>{`
      section {
        padding-bottom: 40px;
      }
    `}</style>
  </Section>
);
