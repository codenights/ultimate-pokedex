const path = require("path");
const { writeFile } = require("fs-extra");
const axios = require("axios");

const DIR = path.join(__dirname, "../dev-server/data/image/artwork");
const POKEMON_COUNT = 809;

for (let nationalId = 1; nationalId <= POKEMON_COUNT; nationalId += 1) {
  const assetUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${nationalId
    .toString()
    .padStart(3, "0")}.png`;

  axios
    .get(assetUrl, {
      responseType: "arraybuffer"
    })
    .then(response => {
      writeFile(path.join(DIR, `${nationalId}.png`), response.data);
    });
}
