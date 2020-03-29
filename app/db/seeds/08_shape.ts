import path from "path";
import * as Knex from "knex";
import { readJSON } from "fs-extra";

import { Shape } from "../../db/types";
import { Shape as ShapeSource } from "./types/Shape";

const FILE = path.join(__dirname, "../../../data/shape/shapes.json");

function mapToTable(shape: ShapeSource): Shape {
  return {
    id: shape.id,
    name_en: shape.name,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing shapes...");

  const shapes = (await readJSON(FILE)).map(mapToTable);

  await knex<Shape>("shape").del().insert(shapes);
};
