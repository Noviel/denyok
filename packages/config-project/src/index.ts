import * as path from 'path';

export const version = () => require("../package.json").version as string;

export const projectConfig = async () => {
  let cfg = {
    packagesPaths: ['packages'],
    packagesNamespace: '@denyok'
  }

  try {
     cfg = { ...cfg, ...require(path.resolve(process.cwd(), 'denyok.json')) };
  } catch {  }

  return cfg;
}