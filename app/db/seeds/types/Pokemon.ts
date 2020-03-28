export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Resource[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  species: Resource;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Resource;
  is_hidden: boolean;
  slot: number;
}

export interface Resource {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Resource;
}

export interface Move {
  move: Resource;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Resource;
  version_group: Resource;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Resource;
}

export interface Type {
  slot: number;
  type: Resource;
}

export interface Pokemon8G {
  id: number;
  names: Names8G;
  genderRate: number;
  types: EggGroup8G[];
  classification: string;
  height: number;
  weight: number;
  captureRate: number;
  baseHappiness: number;
  baseExperience: number;
  eggGroups: EggGroup8G[];
  stats: Stats8G;
  abilities: Ability8G[];
  color: string;
  shape: string;
}

export interface Ability8G {
  id: number;
  name: string;
  isHidden: boolean;
}

export interface EggGroup8G {
  name: string;
  id: number;
}

export interface Names8G {
  en: string;
  fr: string;
  ja: string;
}

export interface Stats8G {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}
