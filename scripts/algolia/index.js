const ora = require("ora");
const chalk = require("chalk");

const { saveObjects } = require("./saveObjects");
const { setSettings } = require("./setSettings");
const { saveRules } = require("./saveRules");

async function run() {
  console.log(
    chalk.bold(
      `Index Pokemon to the Algolia index ${chalk.blue(
        process.env.ALGOLIA_INDEX_NAME
      )}`
    )
  );
  const spinner = ora().start();

  spinner.text = "Fetching all Pokemon";

  spinner.text = `Indexing Pokemon to the index ${chalk.bold.blue(
    process.env.ALGOLIA_INDEX_NAME
  )}`;

  try {
    await saveObjects();

    spinner.text = "Setting indices configuration";
    await setSettings();

    spinner.text = "Saving rules";
    await saveRules();

    spinner.succeed("The Algolia indices were updated.");
  } catch (error) {
    spinner.stop();
    spinner.fail(chalk.red(error.message));

    console.error(error);
  }
}

run();
