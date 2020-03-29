import path from "path";
import * as Knex from "knex";
import { readJSON } from "fs-extra";

import { Color } from "../../db/types";
import { Color as ColorSource } from "./types/Color";

const FILE = path.join(__dirname, "../../../data/color/colors.json");

function mapToTable(color: ColorSource): Color {
  return {
    id: color.id,
    name_en: color.name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing colors...");

  const colors = (await readJSON(FILE)).map(mapToTable);

  await knex<Color>("color").del().insert(colors);
};
