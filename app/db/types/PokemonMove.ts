export type PokemonMove = {
  pokemon_id: number;
  move_id: number;
  version_group_id: number;
  learn_method: string;
  learned_at: number | null;
};
