import React, { useState } from "react";
import uniqBy from "lodash.uniqby";
import Link from "next/link";

import { Section } from "./Section";
import { TypeBadge } from "../TypeBadge";
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
      )
    }));
export const Moves = ({ pokemon }) => {
  const [selectedVersionGroupId, setSelectedVersionGroupId] = useState("18");
  const versionGroups = getAllVersionGroups(pokemon.moves);
  const movesByVersionGroup = getMovesByVersionGroups(
    pokemon.moves,
    selectedVersionGroupId
  );

  return (
    <Section>
      <header>
        <h2>Moves</h2>

        <select
          name="version-gorups"
          id="version-groups"
          onChange={e => setSelectedVersionGroupId(e.target.value)}
          value={selectedVersionGroupId}
        >
          {versionGroups.map(versionGroup => (
            <option key={versionGroup.id} value={versionGroup.id}>
              {versionGroup.name}
            </option>
          ))}
        </select>
      </header>

      <table>
        <thead>
          <tr>
            <td>Move</td>
            <td>Type</td>
            <td>Cat.</td>
            <td>Power</td>
            <td>PP</td>
            <td>Accuracy</td>
            <td>Learn</td>
          </tr>
        </thead>

        <tbody>
          {movesByVersionGroup.map(({ move, learn }) => (
            <tr key={move.id}>
              <td>
                <Link href="/move/[moveId]" as={`/move/${move.id}`}>
                  <a>{move.name}</a>
                </Link>
              </td>
              <td>
                <TypeBadge type={move.type} />
              </td>
              <td>
                <MoveCategoryBadge category={move.damageClass} />
              </td>
              <td>{move.power}</td>
              <td>{move.pp}</td>
              <td>{move.accuracy}</td>
              <td>
                {learn.method}{" "}
                {learn.method === "level-up" && <span>({learn.level})</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        h2 {
          margin-bottom: 0;
        }

        select {
          background: #fff;
          appearance: none;
          padding: 10px 20px;
          font: inherit;
        }

        table {
          width: 100%;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #f1f1f1;
        }

        thead {
          background: #373737;
          color: #fff;
          font-weight: bold;
        }

        thead td {
          padding: 10px;
        }

        td {
          padding: 10px 10px;
        }

        tbody td {
          vertical-align: middle;
        }

        tbody tr:nth-child(even) {
          background: #fff;
        }
      `}</style>
    </Section>
  );
};
