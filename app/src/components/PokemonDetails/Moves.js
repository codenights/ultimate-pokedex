import React, { useState } from "react";
import uniqBy from "lodash.uniqby";
import Link from "next/link";

import { Title, CardList, CardTitle, CardItem } from "../../ui";
import { Section } from "./Section";
import { TypeBadge } from "../TypeBadge";
import { LearnBadge } from "./LearnBadge";
import { MoveCategoryBadge } from "./MoveCategoryBadge";

const getAllVersionGroups = moves => {
  const allGroups = moves.map(x => x.learn.map(y => y.versionGroup)).flat();

  return uniqBy(allGroups, "id").sort((a, b) => b.id - a.id);
};

const getMovesByVersionGroups = (moves, selectedVersionGroupId) =>
  moves
    .filter(({ learn }) =>
      learn.some(
        ({ versionGroup }) => versionGroup.id === selectedVersionGroupId
      )
    )
    .map(x => ({
      ...x,
      learn: x.learn.find(
        ({ versionGroup }) => versionGroup.id === selectedVersionGroupId
      ),
    }));

export const Moves = ({ pokemon }) => {
  const [selectedVersionGroupId, setSelectedVersionGroupId] = useState(18);
  const versionGroups = getAllVersionGroups(pokemon.moves);
  const movesByVersionGroup = getMovesByVersionGroups(
    pokemon.moves,
    selectedVersionGroupId
  );

  return (
    <Section>
      <header>
        <Title>Moves</Title>

        <select
          name="version-groups"
          id="version-groups"
          onChange={e => setSelectedVersionGroupId(Number(e.target.value))}
          value={selectedVersionGroupId}
          className="mb-4"
        >
          {versionGroups.map(versionGroup => (
            <option key={versionGroup.id} value={versionGroup.id}>
              {versionGroup.name}
            </option>
          ))}
        </select>
      </header>

      <CardList>
        {movesByVersionGroup.map(({ move, learn }) => (
          <CardItem key={move.id}>
            <CardTitle>
              <Link href="/move/[moveId]" as={`/move/${move.id}`}>
                <a>{move.name}</a>
              </Link>
            </CardTitle>

            <dl>
              <div>
                <dt>Type</dt>
                <dd>
                  <TypeBadge type={move.type} />
                </dd>
              </div>

              <div>
                <dt>Cat</dt>
                <dd>
                  <MoveCategoryBadge category={move.damageClass} />
                </dd>
              </div>

              <div className="text-center">
                <dt>Pwr</dt>
                {move.power ? (
                  <dd className="text-white">{move.power}</dd>
                ) : (
                  <dd>–</dd>
                )}
              </div>

              <div className="text-center">
                <dt>Acc</dt>
                {move.accuracy ? (
                  <dd className="text-white">{move.accuracy}</dd>
                ) : (
                  <dd>–</dd>
                )}
              </div>

              <div className="text-center">
                <dt>PP</dt>
                {move.pp ? (
                  <dd className="text-white">{move.pp}</dd>
                ) : (
                  <dd>–</dd>
                )}
              </div>

              <div className="ml-10">
                <dt>Learn</dt>
                <dd>
                  <LearnBadge learn={learn} />
                </dd>
              </div>
            </dl>
          </CardItem>
        ))}
      </CardList>
    </Section>
  );
};
