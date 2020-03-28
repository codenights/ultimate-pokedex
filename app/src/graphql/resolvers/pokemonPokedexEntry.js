export const PokemonPokedexEntryResolver = {
  version: ({ version_id }, args, { versionRepository }) =>
    versionRepository.findVersionById.load(version_id),
};
