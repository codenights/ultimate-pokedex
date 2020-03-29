import path from "path";
import * as Knex from "knex";

import { Pokemon, VersionGroupDetail, Resource } from "./types/Pokemon";
import { getDirectoryContent, extractIdFromUrl } from "./utils";

const DIR = path.join(__dirname, "../../../data/pokemon");

type PokemonMoveDatabase = {
  pokemon_id: number;
  move_id: number;
  version_group_id: number;
  learn_method: string;
  learned_at: number | null;
};

function mapToTable(
  move: Resource,
  pokemon: Pokemon,
  versionGroupDetails: VersionGroupDetail
): PokemonMoveDatabase {
  const isLevelUpMethod =
    versionGroupDetails.move_learn_method.name === "level-up";

  return {
    pokemon_id: pokemon.id,
    move_id: extractIdFromUrl("move", move.url),
    version_group_id: extractIdFromUrl(
      "version-group",
      versionGroupDetails.version_group.url
    ),
    learn_method: versionGroupDetails.move_learn_method.name,
    learned_at: isLevelUpMethod ? versionGroupDetails.level_learned_at : null,
  };
}

exports.seed = async (knex: Knex) => {
  console.log("Importing Pokemon / Moves...");

  const pokemons = await getDirectoryContent<Pokemon>(DIR);

  await knex("pokemon_move").del();

  for (const pokemon of pokemons) {
    for (const { move, version_group_details } of pokemon.moves) {
      for (const versionGroupDetails of version_group_details) {
        const pokemonMoveEntry = mapToTable(move, pokemon, versionGroupDetails);

        // @TODO: decide if we support all versions' moves.
        if (pokemonMoveEntry.version_group_id === 18) {
          await knex("pokemon_move").insert(pokemonMoveEntry);
        }
      }
    }
  }
};
