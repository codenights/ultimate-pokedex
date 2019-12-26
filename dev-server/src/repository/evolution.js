module.exports.EvolutionRepository = function(knex) {
  return {
    findEvolutionsByPokemonId(pokemonId) {
      return knex("evolution").where({ evolves_from_id: pokemonId });
    }
  };
};
