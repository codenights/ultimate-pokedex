export const mapRowsToEntities = (ids, mapBy) => rows =>
  ids.map(id => rows.find(row => row[mapBy].toString() === id.toString()));

export const mapManytoEntities = (ids, mapBy) => rows =>
  ids.map(id => rows.filter(row => row[mapBy].toString() === id.toString()));
