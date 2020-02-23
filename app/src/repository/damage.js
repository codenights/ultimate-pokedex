export function DamageRepository(knex) {
  return {
    findDamagesFromByTypeIds: (type_1_id, type_2_id) =>
      knex("damage_relation")
        .select("t2.id as type_from_id")
        .select(
          knex.raw(`
          IF(
            EXP(
              SUM(
                LOG(multiplier)
              )
            ) is null,
            0,
            EXP(
              SUM(
                LOG(multiplier)
              )
            )
          ) as total_multiplier`)
        )
        .innerJoin("type as t1", "damage_relation.type_1", "t1.id")
        .innerJoin("type as t2", "damage_relation.type_2", "t2.id")
        .whereIn("type_1", [type_1_id, type_2_id])
        .andWhere({
          relation: "FROM",
        })
        .groupBy("t2.id")
        .having("total_multiplier", "!=", 1),

    findDamagesToByTypeIds: (type_1_id, type_2_id) =>
      knex("damage_relation")
        .select("t2.id as type_from_id")
        .select(
          knex.raw(`
          IF(
            EXP(
              SUM(
                LOG(multiplier)
              )
            ) is null,
            0,
            EXP(
              SUM(
                LOG(multiplier)
              )
            )
          ) as total_multiplier`)
        )
        .innerJoin("type as t1", "damage_relation.type_1", "t1.id")
        .innerJoin("type as t2", "damage_relation.type_2", "t2.id")
        .whereIn("type_1", [type_1_id, type_2_id])
        .andWhere({
          relation: "TO",
        })
        .groupBy("t2.id")
        .having("total_multiplier", "!=", 1),
  };
}
