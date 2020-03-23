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
const idDescIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME_ID_DESC);
const nameAscIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME_NAME_ASC);
const nameDescIndex = client.initIndex(
  process.env.ALGOLIA_INDEX_NAME_NAME_DESC
);
const heightAscIndex = client.initIndex(
  process.env.ALGOLIA_INDEX_NAME_HEIGHT_ASC
);
const heightDescIndex = client.initIndex(
  process.env.ALGOLIA_INDEX_NAME_HEIGHT_DESC
);
const weightAscIndex = client.initIndex(
  process.env.ALGOLIA_INDEX_NAME_WEIGHT_ASC
);
const weightDescIndex = client.initIndex(
  process.env.ALGOLIA_INDEX_NAME_WEIGHT_DESC
);

module.exports = {
  mainIndex,
  idDescIndex,
  nameAscIndex,
  nameDescIndex,
  heightAscIndex,
  heightDescIndex,
  weightAscIndex,
  weightDescIndex,
};
