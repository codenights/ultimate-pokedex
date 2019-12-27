import React from "react";

import { Section } from "./Section";

export const AboutMove = ({ move }) => (
  <Section>
    <h2>About {move.name}</h2>

    <dl>
      <dt>Accuracy</dt>
      <dd>{move.accuracy || "-"}</dd>

      <dt>PP</dt>
      <dd>{move.pp}</dd>

      <dt>Power</dt>
      <dd>{move.power || "-"}</dd>

      <dt>Damage class</dt>
      <dd>
        <img src={`/img/${move.damageClass}.png`} alt={move.damageClass} />
        <span>{move.damageClass}</span>
      </dd>
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
