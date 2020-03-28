export interface EggGroup {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecies[];
}

export interface Name {
  language: PokemonSpecies;
  name: string;
}

export interface PokemonSpecies {
  name: string;
  url: string;
}
