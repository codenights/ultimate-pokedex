require("dotenv").config();

const algoliasearch = require("algoliasearch");
const ora = require("ora");
const chalk = require("chalk");

const { fetchPokemons } = require("./fetchPokemons");
const { indexSettings } = require("./indexSettings");

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
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

async function run() {
  console.log(
    chalk.bold(
      `Index Pokemon to the Algolia index ${chalk.blue(
        process.env.ALGOLIA_INDEX_NAME
      )}`
    )
  );
  const spinner = ora().start();

  try {
    spinner.text = "Fetching all Pokemon";
    const pokemons = await fetchPokemons();

    spinner.text = `Indexing Pokemon to the index ${chalk.bold.blue(
      process.env.ALGOLIA_INDEX_NAME
    )}`;

    try {
      await index.saveObjects(pokemons);

      spinner.text = "Setting indices configuration";

      try {
        await index.setSettings(indexSettings, {
          forwardToReplicas: true,
        });

        spinner.succeed("The Algolia indices were updated.");
      } catch (error) {
        spinner.stop();

        throw error;
      }
    } catch (error) {
      spinner.stop();

      throw error;
    }
  } catch (error) {
    spinner.stop();

    throw error;
  }
}

run();
