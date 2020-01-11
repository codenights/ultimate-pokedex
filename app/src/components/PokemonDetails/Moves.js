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
  const [selectedVersionGroupId, setSelectedVersionGroupId] = useState(18);
  const versionGroups = getAllVersionGroups(pokemon.moves);
  const movesByVersionGroup = getMovesByVersionGroups(
    pokemon.moves,
    selectedVersionGroupId
  );

  return (
    <Section>
      <header>
      <h2 className="text-2xl text-gray-500">Moves</h2>

        <select
          name="version-gorups"
          id="version-groups"
          onChange={e => setSelectedVersionGroupId(Number(e.target.value))}
          value={selectedVersionGroupId}
        >
          {versionGroups.map(versionGroup => (
            <option key={versionGroup.id} value={versionGroup.id}>
              {versionGroup.name}
            </option>
          ))}
        </select>
      </header>
      <table className="table-auto">
        <thead>
          <tr className="border-b border-gray-800 text-sm text-gray-400">
            <th className="w-3/12 font-normal">Move</th>
            <th className="w-2/12 py-2 font-normal">Type</th>
            <th className="w-2/12 py-2 font-normal">Cat.</th>
            <th className="w-1/12 py-2 font-normal">Power</th>
            <th className="w-1/12 py-2 font-normal">PP</th>
            <th className="w-1/12 py-2 font-normal">Accu.</th>
            <th className="w-2/12 py-2 font-normal">Learn</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {movesByVersionGroup.map(({ move, learn }) => (
            <tr key={move.id}>
              <td className="border-t border-gray-800 px-4 py-1">
                <Link href="/move/[moveId]" as={`/move/${move.id}`}>
                  <a className="text-gray-400">{move.name}</a>
                </Link>
              </td>
              <td className="border-t border-gray-800 px-4 py-1">
                <TypeBadge type={move.type} />
              </td>
              <td className="border-t border-gray-800 px-4 py-1">
                <MoveCategoryBadge category={move.damageClass} />
              </td>
              <td className="border-t border-gray-800 px-4 py-1 text-center">{move.power}</td>
              <td className="border-t border-gray-800 px-4 py-1 text-center">{move.pp}</td>
              <td className="border-t border-gray-800 px-4 py-1 text-center">{move.accuracy}</td>
              <td className="border-t border-gray-800 px-4 py-1">
                {learn.method}{" "}
                {learn.method === "level-up" && <span>({learn.level})</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};
