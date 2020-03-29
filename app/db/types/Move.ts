export type Move = {
  id: number;
  name: string;
  description: string;
  type_id: number;
  damage_class: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  priority: number;
  critical_rate: number;
  drain: number | null;
  flinch_chance: number;
  healing: number | null;
};
