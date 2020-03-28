import * as Knex from "knex";
import { Type } from "./types/Type";

const path = require("path");
const { getDirectoryContent } = require("./utils");

const DIR = path.join(__dirname, "../../data/type");
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

type TypeDatabase = {
  id: number;
  color: string;
  name_en: string;
};

function mapToTable(type: Type): TypeDatabase {
  return {
    id: type.id,
    color: COLORS_BY_TYPE[type.name],
    name_en: type.names.find(x => x.language.name === "en").name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing types...");

  const types: TypeDatabase[] = (await getDirectoryContent(DIR)).map(
    mapToTable
  );

  await knex("type").del().insert(types);
};
