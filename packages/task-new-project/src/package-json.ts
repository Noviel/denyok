/* Generate package.json for a project */

/* Map options to package.json-compatible JSON */

interface Options {
  version: string;
  description: string;
  namespace?: string;
  name: string;
  homepage: string;
  isRoot: boolean;
  repository: {
    type: string;
    url: string;
  };
  typescript: boolean;
  targets: string[];
  packagesFolders: string[];
  author: string;
  license: string;
}

