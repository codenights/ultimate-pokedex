export interface Type {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: Resource;
  id: number;
  move_damage_class: Resource;
  moves: Resource[];
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

export interface DamageRelations {
  double_damage_from: Resource[];
  double_damage_to: any[];
  half_damage_from: any[];
  half_damage_to: Resource[];
  no_damage_from: Resource[];
  no_damage_to: Resource[];
}

export interface Resource {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  generation: Resource;
}

export interface Name {
  language: Resource;
  name: string;
}

export interface Pokemon {
  pokemon: Resource;
  slot: number;
}
