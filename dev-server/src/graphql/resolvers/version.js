const COLOR_BY_VERSION = {
  "ultra-sun": "#db8624",
  "ultra-moon": "#7038f8",
  sun: "#db8624",
  moon: "#7038f8",
  "alpha-sapphire": "#5d81d6",
  "omega-ruby": "#c03028",
  y: "#c03028",
  x: "#5d81d6",
  "white-2": "#9797ab",
  "black-2": "#574438",
  white: "#9797ab",
  black: "#574438",
  pearl: "#de4f7a",
  heartgold: "#ad9551",
  platinum: "#9797ab",
  soulsilver: "#9797ab",
  diamond: "#8471bd",
  leafgreen: "#65a843",
  firered: "#c03028",
  emerald: "#909e1b",
  sapphire: "#5d81d6",
  ruby: "#c03028",
  crystal: "#87bfbf",
  silver: "#9797ab",
  gold: "#ad9551",
  yellow: "#d6b11f",
  blue: "#5d81d6",
  red: "#c03028"
};

module.exports.VersionResolver = {
  name: version => version.names.find(x => x.language.name === "en").name,
  color: version => console.log(version.name) || COLOR_BY_VERSION[version.name]
};
