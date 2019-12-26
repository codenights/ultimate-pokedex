const R = require("ramda");

module.exports.VersionGroupResolver = {
  name: async ({ id }, args, { versionRepository }) => {
    const versions = await versionRepository.findVersionsByVersionGroupId(id);

    return versions.map(R.prop("name_en")).join(" / ");
  }
};
