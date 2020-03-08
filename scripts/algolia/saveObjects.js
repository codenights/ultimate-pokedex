const fetch = require("isomorphic-unfetch");
const nlp = require("compromise");

const { mainIndex } = require("./algoliaIndices");
const { startersId } = require("./data/starters");
const { fabulousId } = require("./data/fabulous");
const { babiesId } = require("./data/babies");
const { legendariesId } = require("./data/legendaries");

nlp.extend(require("compromise-syllables"));

const GRAPHQL_ENDPOINT = "http://localhost:3000/api/graphql";

const query = `
  {
    pokemons {
      id
      names {
        en
        fr
        ja
      }
      artworkUrl
      spriteUrl
      spriteShinyUrl
      isDefaultForm
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
      abilities {
        ability {
          id
          name
        }
        isHidden
      }
      damagesFrom {
        type {
          name
        }
        multiplier
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

function transformPokemon(pokemon) {
  return {
    ...pokemon,
    objectID: String(pokemon.id),
    starter: startersId.includes(pokemon.id),
    fabulous: fabulousId.includes(pokemon.id),
    baby: babiesId.includes(pokemon.id),
    legendary: legendariesId.includes(pokemon.id),
    nameTokens: {
      en: getNameTokens(nlp(pokemon.names.en).syllables()[0]),
      fr: getNameTokens(nlp(pokemon.names.fr).syllables()[0]),
      ja: getNameTokens(nlp(pokemon.names.ja).syllables()[0]),
    },
    artworkUrl: getPublicImageUrl(pokemon.artworkUrl),
    spriteUrl: getPublicImageUrl(pokemon.spriteUrl),
    spriteShinyUrl: getPublicImageUrl(pokemon.spriteShinyUrl),
    abilities: pokemon.abilities.map(x => ({
      name: x.ability.name,
      isHidden: x.isHidden,
    })),
    weakTo: pokemon.damagesFrom
      .filter(x => x.multiplier > 1)
      .map(x => ({
        name: x.type.name,
        multiplier: x.multiplier,
      })),
    resistantTo: pokemon.damagesFrom
      .filter(x => x.multiplier < 1)
      .map(x => ({
        name: x.type.name,
        multiplier: x.multiplier,
      })),
  };
}

async function fetchPokemons() {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await response.json();
  const { pokemons } = data;

  return pokemons.map(transformPokemon);
}

async function saveObjects() {
  try {
    const pokemons = await fetchPokemons();

    await mainIndex.saveObjects(pokemons);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  saveObjects,
};
