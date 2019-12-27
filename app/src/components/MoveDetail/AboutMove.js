import React from "react";

import { Section } from "./Section";

export const AboutMove = ({ move }) => (
  <Section>
    <h2>About {move.name}</h2>

    <dl>
      <dt>Power</dt>
      <dd>{move.power || "-"}</dd>

      <dt>Accuracy</dt>
      <dd>{move.accuracy || "-"}</dd>

      <dt>PP</dt>
      <dd>{move.pp}</dd>

      <dt>Damage class</dt>
      <dd>
        <img src={`/img/${move.damageClass}.png`} alt={move.damageClass} />
        <span>{move.damageClass}</span>
      </dd>

      <dt>Critical Rate</dt>
      <dd>{move.criticalRate}</dd>

      <dt>Flinch chance</dt>
      <dd>{move.flinchChance}%</dd>

      <dt>Drains</dt>
      <dd>{move.drain ? `${move.drain}%` : "-"}</dd>

      <dt>Heals</dt>
      <dd>{move.healing ? `${move.healing}%` : "-"}</dd>
    </dl>

    <style jsx>{`
      dl {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 10px;
      }

      dt {
        opacity: 0.75;
      }

      dd {
        font-weight: bold;
        display: flex;
        align-items: center;
        text-transform: capitalize;
      }

      img {
        margin-right: 10px;
      }
    `}</style>
  </Section>
);
