import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

import { Title, InnerCard } from "../../ui";
import { Section } from "./Section";
import { DamageTypeBadge } from "../DamageTypeBadge";
import { array } from "prop-types";

const getDataFromPokemon = pokemon =>
  Object.keys(pokemon.stats).map(statName => ({
    stat: statName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, str => str.toUpperCase()),
    value: pokemon.stats[statName],
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

const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const Stats = ({ pokemon }) => {
  const weaknesses = pokemon.damagesFrom.filter(
    damage => damage.multiplier > 1
  );
  const resistance = pokemon.damagesFrom.filter(
    damage => damage.multiplier < 1
  );

  return (
    <Section>
      <Title>Combat</Title>

      <div className="flex w-full">
        <div className="w-5/12 mt-6">
          <InnerCard>
            <h3
              className="text-xl mb-3 text-gray-400 flex items-center"
            >
              <svg width="22" height="22" viewBox="0 0 28 28" className="mr-2">
                <path
                  d="M14.05.29l-.31.23a26.89 26.89 0 01-12.7 5.44l-.43.07v.44c0 1.1.49 2.8 1.28 4.9a53.5 53.5 0 003.17 6.88 33.03 33.03 0 004.26 6.21c1.5 1.67 3.09 2.83 4.73 2.83 1.65 0 3.23-1.16 4.74-2.83a33.85 33.85 0 004.25-6.2 54.44 54.44 0 003.18-6.88c.78-2.1 1.27-3.82 1.27-4.91v-.44l-.43-.07A26.99 26.99 0 0114.36.52l-.3-.23zm0 1.28c3.53 2.6 7.18 4.39 12.37 5.32a20.8 20.8 0 01-1.17 4.13c-.24.62-.5 1.28-.8 1.96H15.9v2.65l3.69-.92-5.54 6.46-5.54-6.46 3.7.92v-2.65H3.64c-.29-.68-.55-1.34-.79-1.96a21.2 21.2 0 01-1.17-4.13 28 28 0 0012.37-5.32z"
                  fill="#E14270"
                  fillRule="nonzero"
                />
              </svg>
              Weakness
            </h3>

            {Object.keys(groupBy(weaknesses, 'multiplier')).map(damageMultiplier => (
              <div className="mb-2" key={damageMultiplier}>
                <span className="mb-2 mr-2">⨉ <span className="text-gray-400">{damageMultiplier}</span> damage from </span>
                {weaknesses.filter(damage => damage.multiplier == damageMultiplier).map(damageType => (
                  <span key={damageType.type.name}  className="mr-2">
                    <DamageTypeBadge
                      type={damageType.type}
                      multiplier={damageType.multiplier}
                    />
                  </span>
                ))}
              </div>
            ))}

          </InnerCard>

          <InnerCard>
            <h3
              className="text-xl mb-3 text-gray-400 flex items-center"
            >
              <svg width="22" height="22" viewBox="0 0 28 28" className="mr-2">
                <path
                  d="M13.54.91l-.31.23A26.89 26.89 0 01.53 6.58l-.42.07v.44C.1 8.2.59 9.9 1.38 12a53.5 53.5 0 003.17 6.88 33.03 33.03 0 004.26 6.2c1.5 1.68 3.09 2.83 4.73 2.83 1.65 0 3.23-1.15 4.74-2.82a33.85 33.85 0 004.25-6.21A54.44 54.44 0 0025.71 12c.78-2.1 1.27-3.81 1.27-4.9v-.45l-.43-.07a26.99 26.99 0 01-12.7-5.44l-.3-.23zm0 1.28c3.53 2.6 7.18 4.4 12.37 5.33a20.8 20.8 0 01-1.17 4.12c-.24.63-.5 1.28-.8 1.96H15.4v-2.82l3.69.93-5.54-6.46L8 11.7l3.7-.93v2.82H3.13c-.29-.68-.55-1.33-.79-1.96a21.2 21.2 0 01-1.17-4.12 28 28 0 0012.37-5.33z"
                  fill="#58CC94"
                  fillRule="nonzero"
                />
              </svg>
              Resistance
            </h3>

            {Object.keys(groupBy(resistance, 'multiplier')).map(damageMultiplier => (
              <div className="mb-2" key={damageMultiplier}>
                <span className="mb-2 mr-2">⨉ <span className="text-gray-400">{damageMultiplier}</span> damage from </span>
                {resistance.filter(damage => damage.multiplier == damageMultiplier).map(damageType => (
                  <span key={damageType.type.name} className="mr-2">
                    <DamageTypeBadge
                      type={damageType.type}
                      multiplier={damageType.multiplier}
                    />
                  </span>
                ))}
              </div>
            ))}

          </InnerCard>
        </div>

        <div className="w-7/12" style={{ height: 260 }}>
          <ResponsiveRadar
            data={getDataFromPokemon(pokemon)}
            keys={["value"]}
            indexBy="stat"
            maxValue="auto"
            curve="linearClosed"
            borderWidth={2}
            margin={{ top: 20, bottom: 20, left: 40, right: 10 }}
            gridLevels={5}
            gridShape="linear"
            gridLabelOffset={10}
            enableDots={true}
            dotSize={8}
            dotBorderWidth={0}
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
            theme={{
              axis: {
                ticks: {
                  line: {
                    stroke: "rgb(74, 85, 104)",
                  },
                  text: {
                    fill: "rgb(203, 213, 224)",
                  },
                },
              },
              grid: {
                line: {
                  stroke: "rgb(74, 85, 104)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                },
              },
            }}
          />
        </div>
      </div>
    </Section>
  );
};
