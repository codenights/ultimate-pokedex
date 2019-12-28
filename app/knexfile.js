require("dotenv").config();
const path = require("path");

let developmentConfig = {
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite3"
  },
  migrations: {
    directory: path.join(__dirname, "migrations")
  },
  useNullAsDefault: true
};

if (process.env.DATABASE_DRIVER === "MYSQL") {
  developmentConfig = {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    }
  };
}

module.exports = {
  development: developmentConfig,
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
