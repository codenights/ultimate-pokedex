import DataLoader from "dataloader";
import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";

export function PokemonRepository(knex) {
  return {
    findAllPokemons() {
      return knex("pokemon").orderBy("id");
    },
    findPokemonById: new DataLoader(
      pokemonIds =>
        console.log("findPokemonById:", pokemonIds) ||
        knex("pokemon")
          .whereIn("id", pokemonIds)
          .then(mapRowsToEntities(pokemonIds, "id"))
    ),
    findPokemonsByEggGroupId: new DataLoader(
      eggGroupIds =>
        console.log("findPokemonsByEggGroupId:", eggGroupIds) ||
        knex("pokemon")
          .innerJoin(
            "egg_group_pokemon",
            "pokemon.id",
            "egg_group_pokemon.pokemon_id"
          )
          .select("pokemon.*", "egg_group_id")
          .whereIn("egg_group_id", eggGroupIds)
          .then(mapManytoEntities(eggGroupIds, "egg_group_id"))
    ),
    // TODO: Dataloader
    findVarietiesByPokemonId(pokemonId) {
      return knex("pokemon")
        .whereIn("species_id", function() {
          this.select("species_id")
            .from("pokemon")
            .where({ id: pokemonId });
        })
        .andWhere("id", "!=", pokemonId);
    },
    async findBaseEvolutionByPokemonId(pokemonId) {
      let isBaseEvolutionFound = false;
      let currentStageId = pokemonId;

      do {
        const previousEvolution = await knex("evolution")
          .first()
          .select("evolves_from_id")
          .where({ evolves_to_id: currentStageId });

        if (!previousEvolution) {
          isBaseEvolutionFound = true;
        } else {
          currentStageId = previousEvolution.evolves_from_id;
        }
      } while (!isBaseEvolutionFound);

      return knex("pokemon")
        .first()
        .where({ id: currentStageId });
    },
    // TODO: dataloader
    findPokemonsByMoveId(moveId) {
      return knex("pokemon").whereIn("id", function() {
        this.select("pokemon_id")
          .distinct()
          .from("pokemon_move")
          .where({
            move_id: moveId,
          });
      });
    },
    findPokemonsByTypeId(typeId) {
      return knex("pokemon")
        .where("type_1_id", "=", typeId)
        .orWhere("type_2_id", "=", typeId);
    },
  };
}
