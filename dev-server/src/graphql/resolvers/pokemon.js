const R = require("ramda");

module.exports.PokemonResolver = {
  spriteUrl: R.prop("sprite_url"),
  spriteShinyUrl: R.prop("shiny_sprite_url"),
  artworkUrl: R.prop("artwork_url"),
  baseHappiness: R.prop("base_happiness"),
  captureRate: R.prop("capture_rate"),
  genderRate: R.prop("gender_rate"),
  stats: R.identity,

  names: ({ name_en, name_fr, name_ja }) => ({
    en: name_en,
    fr: name_fr,
    ja: name_ja
  }),

  types: ({ type_1_id, type_2_id }, args, { typeRepository }) =>
    Promise.all(
      [type_1_id, type_2_id].filter(Boolean).map(typeRepository.findTypeById)
    ),

  evolutions: ({ id }, args, { evolutionRepository }) =>
    evolutionRepository.findEvolutionsByPokemonId(id),

  pokedexEntries: ({ id }, args, { pokedexEntryRepository }) =>
    pokedexEntryRepository.findPokedexEntriesByPokemonId(id),

  eggGroups: ({ id }, args, { eggGroupRepository }) =>
    eggGroupRepository.findEggGroupByPokemonId(id),

  abilities: ({ id }, args, { pokemonAbilityRepository }) =>
    pokemonAbilityRepository.findByPokemonId(id),

  moves: async ({ id }, args, { moveRepository }) => {
    const moves = await moveRepository.findMovesByPokemonId(id);

    return moves.map(x => ({
      ...x,
      pokemon_id: id
    }));
  },

  family: async ({ id }, args, { pokemonRepository }) => {
    const pokemon = await pokemonRepository.findBaseEvolutionByPokemonId(id);

    return { pokemon };
  },
  varieties: ({ id }, args, { pokemonRepository }) =>
    pokemonRepository.findVarietiesByPokemonId(id)
};
