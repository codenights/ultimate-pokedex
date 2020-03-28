export interface VersionGroup {
  generation: Resource;
  id: number;
  move_learn_methods: Resource[];
  name: string;
  order: number;
  pokedexes: Resource[];
  regions: Resource[];
  versions: Resource[];
}

export interface Resource {
  name: string;
  url: string;
}
