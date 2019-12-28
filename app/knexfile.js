require("dotenv").config();
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
  },
  production: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: true
    }
  }
};
