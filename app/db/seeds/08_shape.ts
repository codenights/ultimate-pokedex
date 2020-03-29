import path from "path";
import * as Knex from "knex";
import { readJSON } from "fs-extra";

import { Shape } from "./types/Shape";

const FILE = path.join(__dirname, "../../../data/shape/shapes.json");

type ShapeDatabase = {
  id: number;
  name_en: string;
};

function mapToTable(shape: Shape): ShapeDatabase {
  return {
    id: shape.id,
    name_en: shape.name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing shapes...");

  const shapes = (await readJSON(FILE)).map(mapToTable);

  await knex<ShapeDatabase>("shape").del().insert(shapes);
};
