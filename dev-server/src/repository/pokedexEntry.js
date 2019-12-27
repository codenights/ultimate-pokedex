module.exports.PokedexEntryRepository = function(knex) {
  return {
    findPokedexEntriesByPokemonId(pokemonId) {
      return knex("pokedex_entry").where({ pokemon_id: pokemonId });
    }
  };
};
