export function TypeRepository(knex) {
  return {
    findTypeById(typeId) {
      return knex("type")
        .first()
        .where({ id: typeId });
    }
  };
}
