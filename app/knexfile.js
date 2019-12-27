const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite3"
    },
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    useNullAsDefault: true
  }
};
