import { ApolloError } from "apollo-server-micro";

const throwNotFoundIfEmpty = result => {
  if (!result) {
    throw new ApolloError("Not found", "NOT_FOUND");
  }

  return result;
};

export const QueryResolver = {
  pokemons: (obj, args, { pokemonRepository }) =>
    pokemonRepository.findAllPokemons(),
  pokemon: (obj, { nationalId }, { pokemonRepository }) =>
    pokemonRepository.findPokemonById
      .load(nationalId)
      .then(throwNotFoundIfEmpty),
  abilities: (obj, args, { abilityRepository }) =>
    abilityRepository.findAllAbilities(),
  ability: (obj, { id }, { abilityRepository }) =>
    abilityRepository.findAbilityById.load(id).then(throwNotFoundIfEmpty),
  move: (obj, { id }, { moveRepository }) =>
    moveRepository.findMoveById.load(id).then(throwNotFoundIfEmpty),
  eggGroup: (obj, { id }, { eggGroupRepository }) =>
    eggGroupRepository.findEggGroupById.load(id).then(throwNotFoundIfEmpty),
  type: (ob, { id }, { typeRepository }) =>
    typeRepository.findTypeById.load(id).then(throwNotFoundIfEmpty)
};
