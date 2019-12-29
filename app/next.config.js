require("dotenv").config();
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY
  }
});
