const path = require("path");
const { writeFile } = require("fs-extra");
const fetch = require("isomorphic-unfetch");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");
const cheerio = require("cheerio");

const DIR = path.join(__dirname, "../../data/pokemon-next");
const ENDPOINT = "https://bulbapedia.bulbagarden.net/wiki";

const query = `
{
  pokemons {
    id
    names {
      en
    }
    isDefaultForm
  }
}
`;

async function run() {
  console.log(chalk.bold("Enhancing Pokemon list"));
  const spinner = ora().start();

  const pokemons = [];
  const response = await fetch(`http://localhost:3000/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await response.json();

  for (const pokemon of data.pokemons.filter(
    pokemon => pokemon.isDefaultForm === true
  )) {
    spinner.text = `Saving Pokemon ${chalk.bold(
      `#${pokemon.id} ${pokemon.names.en}`
    )}`;

    const response = await axios.get(
      encodeURI(`${ENDPOINT}/${pokemon.names.en}_(Pokémon)`)
    );
    const $ = cheerio.load(response.data);

    const scrapedPokemon = getPokemon({ $, id: pokemon.id });

    pokemons.push(scrapedPokemon);
  }

  spinner.succeed("Pokemon were scraped");

  writeFile(path.join(DIR, "all-gens.json"), JSON.stringify(pokemons, null, 2));
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

function getPokemon({ $, id }) {
  return {
    id,
    color: $('a[href$="_by_color"]')
      .parent()
      .next()
      .text()
      .trim()
      .replace("Other forms may have other colors.", ""),

    shape: getShape(
      $("#mw-content-text")
        .find("img")
        .toArray()
        .filter(img => img.attribs.alt.includes("Body"))
        .filter(img => img.attribs.srcset)[0]
        .attribs.alt.replace(".png", "")
    ),
  };
}
