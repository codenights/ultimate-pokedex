import qs from "qs";

const supportedIndices = [
  process.env.ALGOLIA_INDEX_NAME,
  process.env.ALGOLIA_INDEX_NAME_ID_DESC,
  process.env.ALGOLIA_INDEX_NAME_NAME_ASC,
  process.env.ALGOLIA_INDEX_NAME_NAME_DESC,
  process.env.ALGOLIA_INDEX_NAME_HEIGHT_ASC,
  process.env.ALGOLIA_INDEX_NAME_HEIGHT_DESC,
  process.env.ALGOLIA_INDEX_NAME_WEIGHT_ASC,
  process.env.ALGOLIA_INDEX_NAME_WEIGHT_DESC,
];

function removeEmptyValues(value) {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (value === "") {
      return acc;
    }

    acc[key] = value;

    return acc;
  }, {});
}

function getRangeUrlValue(value) {
  if (!value || (value.min === undefined && value.max === undefined)) {
    return "";
  }

  return [value.min || "", value.max || ""].join(":");
}

function getRangeStateValue(value) {
  if (value === "") {
    return undefined;
  }

  return parseInt(value, 10);
}

function routerUrlReducer(state, [key, value]) {
  if (key === "query" && value) {
    return {
      ...state,
      query: encodeURIComponent(value),
    };
  }

  if (key === "sortBy") {
    const sortMatches = value.match(/^pokemon_(.*)/);

    if (sortMatches) {
      const sortingStrategy = sortMatches[1];

      return {
        ...state,
        sort: sortingStrategy,
      };
    }
  }

  if (key === "refinementList" && value && value["types.name"]) {
    return {
      ...state,
      types: value["types.name"].join("+"),
    };
  }

  if (key === "range" && value && Object.keys(value).length > 0) {
    return {
      ...state,
      ...removeEmptyValues({
        hp: getRangeUrlValue(value["stats.hp"]),
        atk: getRangeUrlValue(value["stats.attack"]),
        def: getRangeUrlValue(value["stats.defense"]),
        "spe-atk": getRangeUrlValue(value["stats.specialAttack"]),
        "spe-def": getRangeUrlValue(value["stats.specialDefense"]),
        speed: getRangeUrlValue(value["stats.speed"]),
      }),
    };
  }

  return state;
}

export function getUrlFromState(state) {
  const queryParameters = Object.entries(state).reduce(routerUrlReducer, {});
  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    encode: false,
  });

  return `/${queryString}`;
}

function routerStateReducer(state, [key, value]) {
  function getStatsValue(statName) {
    return {
      ...state,
      range: {
        ...state.range,
        [statName]: {
          min: getRangeStateValue(value.split(":")[0]),
          max: getRangeStateValue(value.split(":")[1]),
        },
      },
    };
  }

  if (key === "query" && value) {
    return {
      ...state,
      query: decodeURIComponent(value),
    };
  }

  if (key === "sort") {
    const sortBy = `pokemon_${value}`;

    if (supportedIndices.includes(sortBy)) {
      return {
        ...state,
        sortBy,
      };
    }
  }

  if (key === "types") {
    return {
      ...state,
      refinementList: {
        ...state.refinementList,
        "types.name": value.split(" "),
      },
    };
  }

  if (key === "hp") {
    return getStatsValue("stats.hp");
  }

  if (key === "atk") {
    return getStatsValue("stats.attack");
  }

  if (key === "def") {
    return getStatsValue("stats.defense");
  }

  if (key === "spe-atk") {
    return getStatsValue("stats.specialAttack");
  }

  if (key === "spe-def") {
    return getStatsValue("stats.specialDefense");
  }

  if (key === "speed") {
    return getStatsValue("stats.speed");
  }

  return state;
}

export function getStateFromUrl(url) {
  const cleanUrl = url.charAt(0) === "/" ? url.slice(1) : url;
  const rawState = qs.parse(cleanUrl, {
    arrayLimit: 1000,
    ignoreQueryPrefix: true,
  });
  const state = Object.entries(rawState).reduce(routerStateReducer, {});

  return state;
}
