module.exports.extractIdFromUrl = (resource, url) => {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");
  return EXTRACT_URL_REGEXP.exec(url)[1];
};
