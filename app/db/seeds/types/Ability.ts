export interface Ability {
  effect_changes: EffectChange[];
  effect_entries: AbilityEffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Resource;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
}

export interface EffectChange {
  effect_entries: EffectChangeEffectEntry[];
  version_group: Resource;
}

export interface EffectChangeEffectEntry {
  effect: string;
  language: Resource;
}

export interface Resource {
  name: string;
  url: string;
}

export interface AbilityEffectEntry {
  effect: string;
  language: Resource;
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Resource;
  version_group: Resource;
}

export interface Name {
  language: Resource;
  name: string;
}

export interface Pokemon {
  is_hidden: boolean;
  pokemon: Resource;
  slot: number;
}

export interface Ability8G {
  id: number;
  name: string;
  description: string;
}
