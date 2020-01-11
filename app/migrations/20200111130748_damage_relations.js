const path = require("path");
const { getDirectoryContent, extractIdFromUrl } = require("./utils");

const TYPES_DIR = path.join(__dirname, "../../data/type");

const createDamageRelationsTable = async knex =>
  knex.schema.createTable("damage_relation", table => {
    table
      .integer("type_1")
      .unsigned()
      .notNullable();
    table.foreign("type_1").references("type.id");

    table
      .integer("type_2")
      .unsigned()
      .notNullable();
    table.foreign("type_2").references("type.id");

    table.string("relation").notNullable();
    table
      .float("multiplier")
      .unsigned()
      .notNullable();
  });

const DAMAGE_MULTIPLIER_MAP = {
  double_damage_from: {
    relation: "FROM",
    multiplier: 2
  },
  double_damage_to: {
    relation: "TO",
    multiplier: 2
  },
  half_damage_from: {
    relation: "FROM",
    multiplier: 0.5
  },
  half_damage_to: {
    relation: "TO",
    multiplier: 0.5
  },
  no_damage_from: {
    relation: "FROM",
    multiplier: 0
  },
  no_damage_to: {
    relation: "TO",
    multiplier: 0
  }
};

const importDamageRelations = async knex => {
  const allTypes = await getDirectoryContent(TYPES_DIR);
  const relations = [];

  for (const { damage_relations, id } of allTypes) {
    for (const damageType in damage_relations) {
      const otherTypes = damage_relations[damageType];

      for (const { url } of otherTypes) {
        const type_2_id = extractIdFromUrl("type", url);
        const { relation, multiplier } = DAMAGE_MULTIPLIER_MAP[damageType];

        relations.push({
          type_1: id,
          type_2: type_2_id,
          relation,
          multiplier
        });
      }
    }
  }

  await knex("damage_relation")
    .insert(relations)
    .into("damage_relation");
};

exports.up = async knex => {
  await createDamageRelationsTable(knex);
  await importDamageRelations(knex);
};

exports.down = knex => knex.schema.dropTable("damage_relation");
