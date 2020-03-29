import path from "path";
import * as Knex from "knex";

import { DamageRelation } from "../../db/types";
import { Type, DamageRelations as DamageRelationsSource } from "./types/Type";
import { getDirectoryContent, extractIdFromUrl } from "./utils";

const DIR = path.join(__dirname, "../../../data/type");

const DAMAGE_MULTIPLIER_MAP = {
  double_damage_from: {
    relation: "FROM",
    multiplier: 2,
  },
  double_damage_to: {
    relation: "TO",
    multiplier: 2,
  },
  half_damage_from: {
    relation: "FROM",
    multiplier: 0.5,
  },
  half_damage_to: {
    relation: "TO",
    multiplier: 0.5,
  },
  no_damage_from: {
    relation: "FROM",
    multiplier: 0,
  },
  no_damage_to: {
    relation: "TO",
    multiplier: 0,
  },
};

exports.seed = async (knex: Knex) => {
  console.log("Importing damage relations...");

  const types = await getDirectoryContent<Type>(DIR);
  const damageRelations: DamageRelation[] = [];

  for (const { damage_relations, id } of types) {
    for (const damageType in damage_relations) {
      const otherTypes =
        damage_relations[damageType as keyof DamageRelationsSource];

      for (const { url } of otherTypes) {
        const type_2_id = extractIdFromUrl("type", url);
        const { relation, multiplier } = DAMAGE_MULTIPLIER_MAP[
          damageType as keyof DamageRelationsSource
        ];

        damageRelations.push({
          type_1: id,
          type_2: type_2_id,
          relation,
          multiplier,
        });
      }
    }
  }

  await knex<DamageRelation>("damage_relation").del().insert(damageRelations);
};
