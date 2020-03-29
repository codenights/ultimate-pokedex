export const mapRowsToEntities = <TData>(
  ids: readonly number[],
  mapBy: string
) => (rows: TData[]) =>
  ids.map(id => rows.find(row => row[mapBy].toString() === id.toString()));

export const mapManytoEntities = <TData>(
  ids: readonly number[],
  mapBy: string
) => (rows: TData[]) =>
  ids.map(id => rows.filter(row => row[mapBy].toString() === id.toString()));
