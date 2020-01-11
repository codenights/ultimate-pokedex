import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { linearGradientDef } from '@nivo/core'

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
    <h2 className="text-2xl text-gray-500">Stats</h2>

    <ResponsiveRadar
      data={getDataFromPokemon(pokemon)}
      keys={["value"]}
      indexBy="stat"
      maxValue="auto"
      curve="linearClosed"
      borderWidth={2}
      margin={{ top: 50, bottom: 80, left: 100, right: 100 }}
      gridLevels={5}
      gridShape="linear"
      gridLabelOffset={10}
      enableDots={true}
      dotSize={8}
      dotBorderWidth={0}
      borderWidth={0}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={() => getOverallColor(pokemon.stats)}
      fillOpacity={0.1}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={false}
      dotColor={getDotColor}
      theme = {{
        axis: {
          ticks: {
            line: {
              stroke: "rgb(74, 85, 104)"
            },
            text: {
              fill: "rgb(203, 213, 224)"
            }
          }
        },
        grid: {
          line: {
            stroke: "rgb(74, 85, 104)",
            strokeWidth: 1,
            strokeDasharray: "4 4"
          }
        }
      }}

    />

  </Section>
);
