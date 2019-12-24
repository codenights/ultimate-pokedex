module.exports.VersionResolver = {
  name: version => version.names.find(x => x.language.name === "en").name
};
