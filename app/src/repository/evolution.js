export function EvolutionRepository(knex) {
  return {
    findEvolutionsByPokemonId(pokemonId) {
      return knex("evolution").where({ evolves_from_id: pokemonId });
    }
  };
}
