require("dotenv").config();

const algoliasearch = require("algoliasearch");

if (
  !process.env.ALGOLIA_APP_ID ||
  !process.env.ALGOLIA_ADMIN_API_KEY ||
  !process.env.ALGOLIA_INDEX_NAME
) {
  throw new Error("You need to set the Algolia environment variables.");
}

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const mainIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

module.exports = {
  mainIndex,
};
