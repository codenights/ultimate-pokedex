const path = require("path");
const { writeJSON } = require("fs-extra");
const fetch = require("isomorphic-unfetch");
const axios = require("axios");
const ora = require("ora");
const chalk = require("chalk");
const cheerio = require("cheerio");

const GRAPHQL_ENDPOINT = "http://localhost:3000/api/graphql";
const FILE = path.join(
  __dirname,
  "../../data/pokemon-next/evolutions-8-gen.json"
);
const ENDPOINT = "https://www.pokemon.com/us/pokedex";

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

// @TODO `pokemon.com` only lists the evolutions exclusive to the 8th gen,
// and therefore doesn't display, e.g.:
//   - Farfetch'd → Sirfetch'd
//   - Mr. Mime → Mr. Rime
// We should get these evolutions from other sources.
async function run() {
  console.log(chalk.bold("Scraping 8th gen evolutions"));
  const spinner = ora().start();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await response.json();
  const { pokemons } = data;
  const pokemons8th = pokemons
    .filter(pokemon => pokemon.isDefaultForm === true)
    .filter(pokemon => pokemon.id >= 810 && pokemon.id <= 890);
  const visitedIds = [];
  const evolutions = [];

  for (const pokemon of pokemons8th) {
    if (visitedIds.includes(pokemon.id)) {
      continue;
    }

    spinner.text = `Saving Pokemon ${chalk.bold(
      `#${pokemon.id} ${pokemon.names.en}`
    )}`;

    const cleanPokemonName = pokemon.names.en
      // E.g. "Sirfetch'd"
      .replace(/[^a-zA-Z0-9 -]/, "")
      // E.g. "Mr. Rime"
      .replace(/ /g, "-")
      .toLowerCase();
    const response = await axios.get(`${ENDPOINT}/${cleanPokemonName}`);
    const $ = cheerio.load(response.data);
    const evolutionChain = $(".evolution-profile")
      .find("img")
      .map((i, el) => Number(el.attribs.src.slice(-7).replace(".png", "")))
      .toArray();

    if (evolutionChain.length === 2) {
      evolutions.push({
        evolves_from_id: evolutionChain[0],
        evolves_to_id: evolutionChain[1],
      });
    } else if (evolutionChain.length === 3) {
      evolutions.push(
        {
          evolves_from_id: evolutionChain[0],
          evolves_to_id: evolutionChain[1],
        },
        {
          evolves_from_id: evolutionChain[1],
          evolves_to_id: evolutionChain[2],
        }
      );
    }

    visitedIds.push(...evolutionChain);
  }

  spinner.succeed("Evolutions were scraped");

  await writeJSON(FILE, evolutions);
}

run();
