const path = require("path");
const { findEntityByLanguageName } = require("./utils");
const { readJSON } = require("fs-extra");
const { extractIdFromUrl } = require("./utils");

const { getDirectoryContent } = require("./utils");

const POKEMON_DIR = path.join(__dirname, "../../data/pokemon");
const POKEMON_FORM_DIR = path.join(__dirname, "../../data/pokemon-form");
const POKEMON_SPECIES_DIR = path.join(__dirname, "../../data/pokemon-species");

const applySuffix = (name, suffix) => `${name} (${suffix})`;

exports.up = async knex => {
  const allPokemons = await getDirectoryContent(POKEMON_DIR);
  const alternateForms = allPokemons.filter(x => x.id > 10000);

  await knex.transaction(async trx => {
    for (const alternateForm of alternateForms) {
      const [formInfo] = alternateForm.forms;
      const formId = extractIdFromUrl("pokemon-form", formInfo.url);
      const form = await readJSON(
        path.join(POKEMON_FORM_DIR, `${formId}.json`)
      );

      const rawSuffixEn = findEntityByLanguageName(form.form_names, "en")
        ? findEntityByLanguageName(form.form_names, "en").name
        : "Alt. Forme";
      const rawSuffixFr = findEntityByLanguageName(form.form_names, "fr")
        ? findEntityByLanguageName(form.form_names, "fr").name
        : null;
      const rawSuffixJa = findEntityByLanguageName(form.form_names, "roomaji")
        ? findEntityByLanguageName(form.form_names, "roomaji").name
        : null;
      const suffixEn = rawSuffixEn;
      const suffixFr = rawSuffixFr || suffixEn;
      const suffixJa = rawSuffixJa || suffixEn;

      const pokemon = await trx("pokemon")
        .first()
        .where({ id: alternateForm.id });

      const name_en = applySuffix(pokemon.name_en, suffixEn);
      const name_fr = applySuffix(pokemon.name_fr, suffixFr);
      const name_ja = applySuffix(pokemon.name_ja, suffixJa);

      await trx("pokemon")
        .where({ id: alternateForm.id })
        .update({
          name_en,
          name_fr,
          name_ja
        });
    }
  });
};

exports.down = async knex => {
  const allPokemons = await getDirectoryContent(POKEMON_DIR);
  const alternateForms = allPokemons.filter(x => x.id > 10000);

  await knex.transaction(async trx => {
    for (const alternateForm of alternateForms) {
      const speciesId = extractIdFromUrl(
        "pokemon-species",
        alternateForm.species.url
      );
      const species = await readJSON(
        path.join(POKEMON_SPECIES_DIR, `${speciesId}.json`)
      );

      const name_en = findEntityByLanguageName(species.names, "en").name;
      const name_fr = findEntityByLanguageName(species.names, "fr")
        ? findEntityByLanguageName(species.names, "fr").name
        : null;
      const name_ja = findEntityByLanguageName(species.names, "roomaji")
        ? findEntityByLanguageName(species.names, "roomaji").name
        : null;

      await trx("pokemon")
        .where({ id: alternateForm.id })
        .update({
          name_en,
          name_fr,
          name_ja
        });
    }
  });
};
