import * as Knex from "knex";
import DataLoader from "dataloader";

import { mapManytoEntities, mapRowsToEntities } from "../utils/dataloader";
import { Pokemon, Evolution } from "../../db/types";

export function PokemonRepository(knex: Knex) {
  return {
    findAllPokemons() {
      return knex("pokemon").orderBy("id");
    },
    findPokemonById: new DataLoader<number, Pokemon>(
      pokemonIds => (
        console.log("findPokemonById:", pokemonIds),
        knex("pokemon")
          .whereIn("id", pokemonIds)
          .then(mapRowsToEntities<Pokemon>(pokemonIds, "id"))
      )
    ),
    findPokemonsByEggGroupId: new DataLoader<number, Pokemon[]>(
      eggGroupIds => (
        console.log("findPokemonsByEggGroupId:", eggGroupIds),
        knex("pokemon")
          .innerJoin(
            "pokemon_egg_group",
            "pokemon.id",
            "pokemon_egg_group.pokemon_id"
          )
          .select("pokemon.*", "egg_group_id")
          .whereIn("egg_group_id", eggGroupIds)
          .then(mapManytoEntities<Pokemon>(eggGroupIds, "egg_group_id"))
      )
    ),
    // TODO: Dataloader
    findVarietiesByPokemonId(pokemonId: number) {
      return knex("pokemon")
        .whereIn("species_id", function () {
          this.select("species_id").from("pokemon").where({ id: pokemonId });
        })
        .andWhere("id", "!=", pokemonId);
    },
    async findBaseEvolutionByPokemonId(pokemonId: number): Promise<Pokemon> {
      let isBaseEvolutionFound = false;
      let currentStageId = pokemonId;

      do {
        const previousEvolution = await knex<Evolution>("evolution")
          .first()
          .select("evolves_from_id")
          .where({ evolves_to_id: currentStageId });

        if (!previousEvolution) {
          isBaseEvolutionFound = true;
        } else {
          currentStageId = previousEvolution.evolves_from_id;
        }
      } while (!isBaseEvolutionFound);

      return knex("pokemon").first().where({ id: currentStageId });
    },
    // TODO: dataloader
    findPokemonsByMoveId(moveId: number): Promise<Pokemon[]> {
      return knex<Pokemon>("pokemon").whereIn("id", function () {
        this.select("pokemon_id").distinct().from("pokemon_move").where({
          move_id: moveId,
        });
      });
    },
    findPokemonsByTypeId(typeId: number): Promise<Pokemon[]> {
      return knex<Pokemon>("pokemon")
        .where("type_1_id", "=", typeId)
        .orWhere("type_2_id", "=", typeId);
    },
  };
}
