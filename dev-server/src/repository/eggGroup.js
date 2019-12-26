module.exports.EggGroupRepository = function(knex) {
  return {
    findEggGroupByPokemonId(pokemonId) {
      return knex("egg_group")
        .innerJoin(
          "egg_group_pokemon",
          "egg_group.id",
          "egg_group_pokemon.egg_group_id"
        )
        .select("egg_group.*")
        .where({ pokemon_id: pokemonId });
    }
  };
};
