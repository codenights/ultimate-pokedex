import React from "react";

export const PokedexEntries = ({ pokemon }) => (
  <section>
    <h2>Pokedex entries</h2>

    <table>
      <thead>
        <tr>
          <td>Game</td>
          <td>Pokedex entry</td>
        </tr>
      </thead>
      <tbody>
        {pokemon.pokedexEntries.map(({ entry, version }) => (
          <tr key={version.id}>
            <td style={{ color: version.color, fontWeight: 400 }}>
              {version.name}
            </td>
            <td>{entry}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <style jsx>{`
      table {
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
  </section>
);
