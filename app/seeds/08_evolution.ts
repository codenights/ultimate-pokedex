import * as Knex from "knex";
import { EvolutionChain } from "./types/Evolution";

const path = require("path");
const { readJSON } = require("fs-extra");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const EVOLUTION_DIR = path.join(__dirname, "../../data/evolution-chain");
const EVOLUTION_8G_FILE = path.join(
  __dirname,
  "../../data/pokemon-next/evolutions-8-gen.json"
);

type EvolutionDatabase = {
  evolves_from_id: number;
  evolves_to_id: number;
};

function mapToTable(evolution: EvolutionChain): EvolutionDatabase[] {
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

  const evolutionEntries: EvolutionDatabase[] = [];
  const evolutions = await getDirectoryContent(EVOLUTION_DIR);

  for (const evolution of evolutions) {
    evolutionEntries.push(...findEvolutions(evolution.chain));
  }

  evolutionEntries.push(...(await readJSON(EVOLUTION_8G_FILE)));

  await knex("evolution").del().insert(evolutionEntries);
};
