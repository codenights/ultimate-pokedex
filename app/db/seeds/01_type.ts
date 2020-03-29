import path from "path";
import * as Knex from "knex";

import { Type } from "../../db/types";
import { Type as TypeSource } from "./types/Type";
import { getDirectoryContent } from "./utils";

const DIR = path.join(__dirname, "../../../data/type");
const COLORS_BY_TYPE = {
  poison: "#a59",
  grass: "#7c5",
  fire: "#f42",
  flying: "#89f",
  water: "#39f",
  electric: "#fc3",
  dragon: "#76e",
  ice: "#6cf",
  fighting: "#b54",
  rock: "#ba6",
  ground: "#db5",
  psychic: "#f59",
  bug: "#ab2",
  dark: "#754",
  steel: "#aab",
  fairy: "#e9e",
  ghost: "#66b",
  normal: "#aa9",
};

function mapToTable(type: TypeSource): Type {
  return {
    id: type.id,
    color: COLORS_BY_TYPE[type.name],
    name_en: type.names.find(x => x.language.name === "en").name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing types...");

  const types = (await getDirectoryContent<TypeSource>(DIR)).map(mapToTable);

  await knex<Type>("type").del().insert(types);
};
