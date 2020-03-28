type VersionName =
  | "ultra-sun"
  | "ultra-moon"
  | "sun"
  | "moon"
  | "alpha-sapphire"
  | "omega-ruby"
  | "y"
  | "x"
  | "white"
  | "black"
  | "white"
  | "black"
  | "pearl"
  | "heartgold"
  | "platinum"
  | "soulsilver"
  | "diamond"
  | "leafgreen"
  | "firered"
  | "emerald"
  | "sapphire"
  | "ruby"
  | "crystal"
  | "silver"
  | "gold"
  | "yellow"
  | "blue"
  | "red"
  | "colosseum"
  | "xd";

export interface Version {
  id: number;
  name: VersionName;
  names: Name[];
  version_group: VersionGroup;
}

export interface Name {
  language: VersionGroup;
  name: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}
