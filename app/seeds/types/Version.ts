export interface Version {
  id: number;
  name: string;
  names: Name[];
  version_group: VersionGroup;
}

export interface Name {
  language: VersionGroup;
  name: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}
