const path = require("path");
const { readJSON, writeFile } = require("fs-extra");
const axios = require("axios");

const DIR = path.join(__dirname, "../../app/public/sprite");
const DIR_SHINY = path.join(__dirname, "../../app/public/sprite-shiny");
const POKEMON_COUNT = 807;

async function getPokemonNameFromNationalId(nationalId) {
  return (
    await readJSON(
      path.join(__dirname, "../../data/pokemon-species", `${nationalId}.json`)
    )
  ).name;
}

async function fetchById(nationalId, hrefPath, outDir, extension) {
  const name = await getPokemonNameFromNationalId(nationalId);
  const assetUrl = `https://img.pokemondb.net/sprites/${hrefPath}/${name}.${extension}`;

  const response = await axios.get(assetUrl, {
    responseType: "arraybuffer"
  });

  await writeFile(path.join(outDir, `${nationalId}.png`), response.data);
}

async function run() {
  for (let nationalId = 1; nationalId <= POKEMON_COUNT; nationalId += 1) {
    try {
      await fetchById(nationalId, "sword-shield/pixel", DIR, "png");
    } catch (error) {
      try {
        await fetchById(nationalId, "ultra-sun-ultra-moon/small", DIR, "jpg");
      } catch (error) {
        try {
          await fetchById(
            nationalId,
            "omega-ruby-alpha-sapphire/dex/normal",
            DIR,
            "png"
          );
          await fetchById(
            nationalId,
            "omega-ruby-alpha-sapphire/dex/shiny",
            DIR_SHINY,
            "png"
          );
        } catch (error) {
          try {
            await fetchById(nationalId, "x-y/normal", DIR, "png");
            await fetchById(nationalId, "x-y/shiny", DIR_SHINY, "png");
          } catch (error) {}
        }
      }
    }
  }
}

run();
