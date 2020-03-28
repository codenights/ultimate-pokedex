const path = require("path");
const { writeFile } = require("fs-extra");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");
const cheerio = require("cheerio");

const DIR = path.join(__dirname, "../../data/pokemon-next");
const ENDPOINT = "https://www.serebii.net/pokedex-swsh/";
const POKEMON_FROM = 810;
const POKEMON_TO = 890;

async function run() {
  console.log(
    chalk.bold(
      `Scraping Pokemon from ${chalk.blue(POKEMON_FROM)} to ${chalk.blue(
        POKEMON_TO
      )} at ${chalk.green(ENDPOINT)}`
    )
  );
  const spinner = ora().start();

  const pokemons = [];

  for (let id = POKEMON_FROM; id <= POKEMON_TO; id += 1) {
    spinner.text = `Saving Pokemon ${chalk.bold(id)}`;

    const response = await axios.get(`${ENDPOINT}/${id}.shtml`);
    const $ = cheerio.load(response.data);

    pokemons.push(getPokemon({ id, $ }));
  }

  spinner.succeed("Pokemon were scraped");

  writeFile(path.join(DIR, "8-gen.json"), JSON.stringify(pokemons, null, 2));
}

run();

function getGenderRate(value) {
  if (value.text() && value.text().includes("Genderless")) {
    return -1;
  }

  const [malePercentage, femalePercentage] = value
    .find("> table:nth-child(1) > tbody:nth-child(1) > tr > td:nth-child(2)")
    .toArray()
    .map(x => Number(x.children[0].data.replace("%", "")));

  return Math.ceil(femalePercentage / 12.5);
}

function getBaseHappiness(value) {
  if (value) {
    return Number(value);
  }

  return null;
}

function getHeight(value) {
  return Number(value.split("\t").splice(-1)[0].replace("m", "")) * 10;
}

function getWeight(value) {
  return Number(value.split("\t").splice(-1)[0].replace("kg", "")) * 10;
}

function getStats(value) {
  const [hp, attack, defense, specialAttack, specialDefense, speed] = value;

  return { hp, attack, defense, specialAttack, specialDefense, speed };
}

function getPokemon({ id, $ }) {
  return {
    id,
    names: {
      en: $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)"
      ).text(),
      fr: $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)"
      ).text(),
      ja: $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)"
      ).text(),
    },
    types: [
      ...new Set(
        $("table.dextable:nth-child(4) tr:nth-child(2) > td:nth-child(5)")
          .find("img")
          .map((i, el) => el.attribs.alt.split("-")[0])
          .toArray()
      ),
    ].map(name => ({ name })),
    classification: $(
      "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)"
    )
      .text()
      .replace(" Pokémon", ""),
    height: getHeight(
      $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)"
      ).text()
    ),
    weight: getWeight(
      $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(3)"
      ).text()
    ),
    genderRate: getGenderRate(
      $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4)"
      )
    ),
    captureRate: Number(
      $(
        "table.dextable:nth-child(4) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(4)"
      ).text()
    ),
    baseHappiness: getBaseHappiness(
      $(
        "table.dextable:nth-child(5) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)"
      ).text()
    ),
    eggGroups: $(".dexitem > tbody:nth-child(1) > tr > td:nth-child(2)")
      .find("a")
      .map((i, el) => ({
        name: el.children[0].data,
      }))
      .toArray(),
    stats: getStats(
      $('a[name="stats"]')
        .next("table.dextable")
        .find("tbody:nth-child(1) > tr:nth-child(3)")
        .find("td:nth-child(n+2)")
        .map((i, el) => Number(el.children[0].data))
        .toArray()
    ),
    abilities: [],
  };
}
