const path = require("path");
const { writeFile } = require("fs-extra");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");

const DIR = path.join(__dirname, "../../app/public/artwork");
const ENDPOINT = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
const POKEMON_FROM = 1;
const POKEMON_TO = 890;

async function run() {
  console.log(
    chalk.bold(
      `Scraping artworks from ${chalk.blue(POKEMON_FROM)} to ${chalk.blue(
        POKEMON_TO
      )} at ${chalk.green(ENDPOINT)}`
    )
  );
  const spinner = ora().start();

  for (let id = POKEMON_FROM; id <= POKEMON_TO; id += 1) {
    const assetUrl = `${ENDPOINT}${id.toString().padStart(3, "0")}.png`;
    spinner.text = `Saving Pokemon ${chalk.bold(id)}`;

    const response = await axios.get(assetUrl, { responseType: "arraybuffer" });
    writeFile(path.join(DIR, `${id}.png`), response.data);
  }

  spinner.succeed("Artworks were scraped");
}

run();
