import DataLoader from "dataloader";
import { mapRowsToEntities } from "../utils/dataloader";

export function ColorRepository(knex) {
  return {
    findColorById: new DataLoader(
      colorIds =>
        console.log("findColorById:", colorIds) ||
        knex("color")
          .whereIn("id", colorIds)
          .then(mapRowsToEntities(colorIds, "id"))
    ),
  };
}
