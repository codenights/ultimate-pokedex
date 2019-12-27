export function PokemonRepository(knex) {
  return {
    findAllPokemons() {
      return knex("pokemon").orderBy("order");
    },
    findPokemonById(pokemonId) {
      return knex("pokemon")
        .first()
        .where({ id: pokemonId });
    },
    findPokemonsByEggGroupId(eggGroupId) {
      return knex("pokemon")
        .innerJoin(
          "egg_group_pokemon",
          "pokemon.id",
          "egg_group_pokemon.pokemon_id"
        )
        .select("pokemon.*")
        .where({ egg_group_id: eggGroupId });
    },
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
    findPokemonsByMoveId(moveId) {
      return knex("pokemon").whereIn("id", function() {
        this.select("pokemon_id")
          .distinct()
          .from("pokemon_move")
          .where({
            move_id: moveId
          });
      });
    }
  };
}
