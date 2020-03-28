import * as R from "ramda";

export const VersionGroupResolver = {
  name: async ({ id }, args, { versionRepository }) => {
    const versions = await versionRepository.findVersionsByVersionGroupId.load(
      id
    );

    return versions.map(R.prop("name_en")).join(" / ");
  },
};
