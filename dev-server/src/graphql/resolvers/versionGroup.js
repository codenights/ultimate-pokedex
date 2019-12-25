const { findVersionById } = require("../../repository/version");
const { extractVersionIdFromVersionUrl } = require("../../utils");

module.exports.VersionGroupResolver = {
  name: async versionGroup => {
    const versions = await Promise.all(
      versionGroup.versions
        .map(x => x.url)
        .map(extractVersionIdFromVersionUrl)
        .map(findVersionById)
    );

    return versions
      .map(x => x.names.find(x => x.language.name === "en").name)
      .join(" / ");
  }
};
