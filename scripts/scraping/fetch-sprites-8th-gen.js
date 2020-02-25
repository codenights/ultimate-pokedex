const path = require("path");
const { writeFile } = require("fs-extra");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");

const DIR = path.join(__dirname, "../../app/public/sprite");
const SHINY_DIR = path.join(__dirname, "../../app/public/sprite-shiny");
const ENDPOINT = "https://www.serebii.net/swordshield/pokemon/";
const POKEMON_FROM = 810;
const POKEMON_TO = 890;

async function run() {
  console.log(
    chalk.bold(
      `Scraping sprites from ${chalk.blue(POKEMON_FROM)} to ${chalk.blue(
        POKEMON_TO
      )} at ${chalk.green(ENDPOINT)}`
    )
  );
  const spinner = ora().start();

  for (let id = POKEMON_FROM; id <= POKEMON_TO; id += 1) {
    const assetUrl = `${ENDPOINT}${id.toString().padStart(3, "0")}.png`;
    spinner.text = `Saving Pokemon ${chalk.bold(id)}`;

    // Serebii protects consecutive requests.
    await wait(100);

    const response = await axios.get(assetUrl, { responseType: "arraybuffer" });
    writeFile(path.join(DIR, `${id}.png`), response.data);
  }

  spinner.succeed("Sprites were scraped");

  console.log(
    chalk.bold(
      `Scraping shiny sprites from ${chalk.blue(POKEMON_FROM)} to ${chalk.blue(
        POKEMON_TO
      )} at ${chalk.green(ENDPOINT)}`
    )
  );
  const shinySpinner = ora().start();

  for (let id = POKEMON_FROM; id <= POKEMON_TO; id += 1) {
    const assetUrl = `${ENDPOINT}${id.toString().padStart(3, "0")}.png`;
    shinySpinner.text = `Saving Pokemon ${chalk.bold(id)}`;

    // Serebii protects consecutive requests.
    await wait(100);

    const response = await axios.get(assetUrl, { responseType: "arraybuffer" });
    writeFile(path.join(SHINY_DIR, `${id}.png`), response.data);
  }

  shinySpinner.succeed("Shiny sprites were scraped");
}

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

run();
