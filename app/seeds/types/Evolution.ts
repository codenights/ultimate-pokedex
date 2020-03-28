export interface Evolution {
  baby_trigger_item: null;
  chain: EvolutionChain;
  id: number;
}

export interface EvolutionChain {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolutionChain[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionDetails {
  gender: null;
  held_item: null;
  item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: null;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: Species;
  turn_upside_down: boolean;
}

export interface Species {
  name: string;
  url: string;
}
