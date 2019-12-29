require("dotenv").config();
const algoliasearch = require("algoliasearch");
const fetch = require("isomorphic-unfetch");
const nlp = require("compromise");

nlp.extend(require("compromise-syllables"));

const POKEMON_COUNT = 807;
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const fetchPokemonQuery = nationalId => `
  {
    pokemon(nationalId: ${nationalId}) {
      id
      names {
        en
        fr
        ja
      }
      artworkUrl
      spriteUrl
      spriteShinyUrl
      weight
      height
      baseHappiness
      captureRate
      genderRate
      stats {
        hp
        attack
        defense
        specialAttack
        specialDefense
        speed
      }
      types {
        id
        name
        color
      }
      eggGroups {
        id
        name
      }
    }
  }
`;

// We create name tokens so that end of Pokemon names can match:
// "cario" → "Lucario"
// "kachu" → "Pikachu"
// "butoke" → "Qulbutoké"
// See https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/how-to/how-can-i-make-queries-within-the-middle-of-a-word/
function getNameTokens(value) {
  if (!value) {
    return [];
  }

  // E.g. ["bul", "bi", "zar", "re"]
  const syllables = value.syllables;

  // E.g. ["bulbi", "bizar", "zarre"]
  return syllables.reduce((acc, current, index) => {
    const part = [current, syllables[index + 1]].filter(Boolean);

    if (part.length < 2) {
      return acc;
    }

    return [...acc, part.join("")];
  }, []);
}

function getPublicImageUrl(path) {
  return `https://raw.githubusercontent.com/codenights/ultimate-pokedex/master/app/public${path}`;
}

async function run() {
  const pokemonsToIndex = [];

  for (let id = 1; id <= POKEMON_COUNT; id += 1) {
    try {
      const response = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fetchPokemonQuery(id) })
      });
      const { data } = await response.json();
      const { pokemon } = data;

      const nameTokens = {
        en: getNameTokens(nlp(pokemon.names.en).syllables()[0]),
        fr: getNameTokens(nlp(pokemon.names.fr).syllables()[0]),
        ja: getNameTokens(nlp(pokemon.names.ja).syllables()[0])
      };

      const algoliaPokemon = {
        objectID: pokemon.id,
        // Algolia needs a number attribute to sort records.
        order: Number(pokemon.id),
        ...pokemon,
        nameTokens,
        artworkUrl: getPublicImageUrl(pokemon.artworkUrl),
        spriteUrl: getPublicImageUrl(pokemon.spriteUrl),
        spriteShinyUrl: getPublicImageUrl(pokemon.spriteShinyUrl)
      };

      pokemonsToIndex.push(algoliaPokemon);
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const content = await index.saveObjects(pokemonsToIndex);

    console.log(content);
  } catch (error) {
    console.error(error);
  }
}

run();
