const path = require("path");
const { writeFile, readdir, readJSON } = require("fs-extra");
const axios = require("axios");
const uniqBy = require("lodash.uniqby");

const { extractIdFromUrl } = require("../utils");

const POKEMON_DIR = path.join(__dirname, "../../data/pokemon");
const DIR = path.join(__dirname, "../../app/public/artwork");

async function run() {
  const fileNames = await readdir(POKEMON_DIR);
  const allPokemons = await Promise.all(
    fileNames
      .map(name => path.join(POKEMON_DIR, name))
      .map(name => readJSON(name))
  );

  const pokemonIds = uniqBy(
    allPokemons
      .filter(({ is_default }) => !is_default)
      .map(x => ({
        nationalId: x.id,
        speciesId: extractIdFromUrl("pokemon-species", x.species.url).padStart(
          3,
          "0"
        ),
      })),
    "nationalId"
  ).sort((a, b) => a.nationalId - b.nationalId);

  const formBySpeciesId = {};

  for (const { nationalId, speciesId } of pokemonIds) {
    if (!formBySpeciesId[speciesId]) {
      formBySpeciesId[speciesId] = 1;
    }

    formBySpeciesId[speciesId] += 1;
    const formCount = formBySpeciesId[speciesId];

    const url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${speciesId}_f${formCount}.png`;

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });

      console.log(
        "Saving pokemon / species / form: ",
        nationalId,
        speciesId,
        formCount
      );
      await writeFile(path.join(DIR, `${nationalId}.png`), response.data);
    } catch (err) {
      console.log("No artwork for species with form: ", speciesId, formCount);
    }
  }
}

run();
