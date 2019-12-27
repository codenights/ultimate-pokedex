export const PokemonPokedexEntryResolver = {
  version: ({ version_id }, args, { versionRepository }) =>
    versionRepository.findVersionById(version_id)
};
