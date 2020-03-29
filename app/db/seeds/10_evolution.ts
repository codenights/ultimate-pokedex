import path from "path";
import * as Knex from "knex";
import { readJSON } from "fs-extra";

import { Evolution } from "../../db/types";
import {
  EvolutionChain,
  Evolution as EvolutionSource,
} from "./types/Evolution";
import { getDirectoryContent, extractIdFromUrl } from "./utils";

const EVOLUTION_DIR = path.join(__dirname, "../../../data/evolution-chain");
const EVOLUTION_8G_FILE = path.join(
  __dirname,
  "../../../data/pokemon-next/evolutions-8-gen.json"
);

function mapToTable(evolution: EvolutionChain): Evolution[] {
  return evolution.evolves_to.map(x => ({
    evolves_from_id: extractIdFromUrl("pokemon-species", evolution.species.url),
    evolves_to_id: extractIdFromUrl("pokemon-species", x.species.url),
  }));
}

const findEvolutions = (evolution: EvolutionChain) => {
  const evolutionEntries = mapToTable(evolution);

  for (const nextEvolution of evolution.evolves_to) {
    evolutionEntries.push(...findEvolutions(nextEvolution));
  }

  return evolutionEntries;
};

exports.seed = async (knex: Knex) => {
  console.log("Importing evolutions...");

  const evolutionEntries: Evolution[] = [];
  const evolutions = await getDirectoryContent<EvolutionSource>(EVOLUTION_DIR);

  for (const evolution of evolutions) {
    evolutionEntries.push(...findEvolutions(evolution.chain));
  }

  evolutionEntries.push(...(await readJSON(EVOLUTION_8G_FILE)));

  await knex<Evolution>("evolution").del().insert(evolutionEntries);
};
