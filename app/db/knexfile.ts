import { Config } from "knex";

require("dotenv").config();

const development: Config = {
  client: "mysql",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  debug: Boolean(process.env.DATABASE_DEBUG),
};

const production: Config = {
  client: "mysql",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: true,
  },
};

module.exports = { development, production };
