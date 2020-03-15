const path = require("path");
const { readJSON, writeFile } = require("fs-extra");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");
const cheerio = require("cheerio");

const DIR = path.join(__dirname, "../../data/pokemon-next");
const ENDPOINT = "https://bulbapedia.bulbagarden.net/wiki";

async function run() {
  console.log(chalk.bold("Enhancing Pokemon list"));
  const spinner = ora().start();

  const pokemons = await readJSON(path.join(DIR, "8-gen.json"));
  const enhancedPokemons = [];

  for (const pokemon of pokemons) {
    spinner.text = `Saving Pokemon ${chalk.bold(
      `#${pokemon.id} ${pokemon.names.en}`
    )}`;

    const response = await axios.get(
      `${ENDPOINT}/${pokemon.names.en}_(Pokémon)`
    );
    const $ = cheerio.load(response.data);

    const props = getPokemon({ $ });

    const enhancedPokemon = {
      ...pokemon,
      ...props,
    };

    enhancedPokemons.push(enhancedPokemon);
  }

  spinner.succeed("Pokemon were scraped");

  writeFile(
    path.join(DIR, "8-gen.json"),
    JSON.stringify(enhancedPokemons, null, 2)
  );
}

run();

function getShape(value) {
  switch (value) {
    case "Body01":
      return "Head";
    case "Body07":
      return "Head and legs";
    case "Body03":
      return "Fins";
    case "Body14":
      return "Insectoid body";
    case "Body08":
      return "Quadruped body";
    case "Body13":
      return "More than two wings";
    case "Body11":
      return "Multiple bodies";
    case "Body10":
      return "Tentacles";
    case "Body05":
      return "Head and base";
    case "Body06":
      return "Bipedal and tailed";
    case "Body12":
      return "Bipedal and tailess";
    case "Body09":
      return "Pair of wings";
    case "Body02":
      return "Serpentine bodies";
    case "Body04":
      return "Head and arms";
  }
}

function getPokemon({ $ }) {
  const abilities = $(
    "#mw-content-text > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)"
  )
    .find("a")
    .map((i, el) => el.attribs.title.replace(" (Ability)", ""))
    .toArray()
    .map(name => ({ name, isHidden: false }));
  const hiddenAbilities = $(
    "#mw-content-text > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)"
  )
    .find("a")
    .map((i, el) => el.attribs.title.replace(" (Ability)", ""))
    .toArray()
    .map(name => ({ name, isHidden: true }));

  return {
    color: $(
      "#mw-content-text > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(11) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)"
    )
      .text()
      .trim(),

    shape: getShape(
      $(
        "#mw-content-text > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(10) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)"
      )
        .attr("href")
        .split("File:")[1]
        .replace(".png", "")
    ),

    eggGroups: $(
      "#mw-content-text > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)"
    )
      .find("a")
      .map((i, el) => {
        return el.attribs.title.replace(" (Egg Group)", "");
      })
      .toArray()
      .map(name => ({ name })),

    abilities: [...abilities, ...hiddenAbilities],
  };
}
