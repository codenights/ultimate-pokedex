import * as R from "ramda";

export const PokemonResolver = {
  spriteUrl: R.prop("sprite_url"),
  spriteShinyUrl: R.prop("shiny_sprite_url"),
  artworkUrl: R.prop("artwork_url"),
  baseHappiness: R.prop("base_happiness"),
  captureRate: R.prop("capture_rate"),
  genderRate: R.prop("gender_rate"),
  stats: R.identity,
  isDefaultForm: R.prop("is_default_form"),

  names: ({ name_en, name_fr, name_ja }) => ({
    en: name_en,
    fr: name_fr,
    ja: name_ja
  }),

  types: ({ type_1_id, type_2_id }, args, { typeRepository }) =>
    Promise.all(
      [type_1_id, type_2_id]
        .filter(Boolean)
        .map(typeId => typeRepository.findTypeById.load(typeId))
    ),

  evolutions: ({ id }, args, { evolutionRepository }) =>
    evolutionRepository.findEvolutionsByPokemonId.load(id),

  pokedexEntries: ({ id }, args, { pokedexEntryRepository }) =>
    pokedexEntryRepository.findPokedexEntriesByPokemonId.load(id),

  eggGroups: ({ id }, args, { eggGroupRepository }) =>
    eggGroupRepository.findEggGroupByPokemonId.load(id),

  abilities: ({ id }, args, { pokemonAbilityRepository }) =>
    pokemonAbilityRepository.findByPokemonId.load(id),

  moves: async ({ id }, args, { moveRepository }) => {
    const moves = await moveRepository.findMovesByPokemonId.load(id);

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
    pokemonRepository.findVarietiesByPokemonId(id),

  damagesFrom: ({ type_1_id, type_2_id }, args, { damageRepository }) =>
    damageRepository.findDamagesByTypeIds(type_1_id, type_2_id)
};
