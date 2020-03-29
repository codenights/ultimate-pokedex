import path from "path";
import * as Knex from "knex";
import { readJSON } from "fs-extra";

import { Color } from "./types/Color";

const FILE = path.join(__dirname, "../../../data/color/colors.json");

type ColorDatabase = {
  id: number;
  name_en: string;
};

function mapToTable(color: Color): ColorDatabase {
  return {
    id: color.id,
    name_en: color.name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing colors...");

  const colors = (await readJSON(FILE)).map(mapToTable);

  await knex<ColorDatabase>("color").del().insert(colors);
};
