export function PokemonAbilityRepository(knex) {
  return {
    findByAbilityId(abilityId) {
      return knex("pokemon_ability").where({ ability_id: abilityId });
    },
    findByPokemonId(pokemonId) {
      return knex("pokemon_ability").where({ pokemon_id: pokemonId });
    }
  };
}
