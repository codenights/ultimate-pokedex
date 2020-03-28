import path from "path";
import { readJSON, readdir } from "fs-extra";

export async function getDirectoryContent<TData>(dir: string) {
  const fileNames: string[] = await readdir(dir);
  const files = fileNames.map(name => path.join(dir, name));

  return Promise.all<TData>(files.map(name => readJSON(name)));
}

type LanguageResource = {
  [key: string]: any;
  language: {
    name: string;
    url: string;
  };
};

export function findEntityByLanguageName(
  entities: LanguageResource[],
  languageName: string
) {
  return entities.find(x => x.language.name === languageName);
}

export function extractIdFromUrl(resource: string, url: string) {
  const EXTRACT_URL_REGEXP = new RegExp(`/${resource}/([0-9]*)`, "g");

  return Number(EXTRACT_URL_REGEXP.exec(url)[1]);
}
