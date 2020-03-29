const path = require("path");
const { writeFile } = require("fs-extra");
const fetch = require("isomorphic-unfetch");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");
const cheerio = require("cheerio");

const ENDPOINT = "https://m.bulbapedia.bulbagarden.net/wiki";
const FILE = path.join(
  __dirname,
  "../../data/classification/classifications.json"
);

const query = `
{
  pokemons {
    id
    names {
      en
      fr
    }
    isDefaultForm
  }
}
`;

async function run() {
  console.log(chalk.bold("Fetching Pokemon classifications"));
  const spinner = ora().start();

  const entries = [];
  const response = await fetch(`http://localhost:3000/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await response.json();
  const pokemons = data.pokemons.filter(
    pokemon => pokemon.isDefaultForm === true
  );

  for (const pokemon of pokemons) {
    const url = `${ENDPOINT}/${pokemon.names.en.replace(" ", "_")}_(Pokémon)`;
    spinner.text = [
      [
        chalk.bold.bgBlueBright.white(`#${pokemon.id}`),
        chalk.bold(pokemon.names.en),
        `(${pokemon.names.fr})`,
      ].join(" "),
      [" ", chalk.grey(url)].join(" "),
    ].join("\n");

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const entry = {
      id: pokemon.id,
      name:
        // We ignore alternative forms which have alternative classification
        $('a[title="Pokémon category"]')
          .find("span[title]")
          .text() ||
        // Default forms
        $('a[title="Pokémon category"]')
          .find("span")
          .text()
          .replace(" Pokémon", ""),
    };

    entries.push(entry);
  }

  spinner.succeed("Pokemon were scraped");

  writeFile(FILE, JSON.stringify(entries, null, 2));
}

run();
