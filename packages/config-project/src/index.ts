import * as path from "path";

import { PackageConfiguration } from "./config";

export * from "./config";

export const version = () => require("../package.json").version as string;

export const getProjectConfig = async () => {
  try {
    return require(path.resolve(
      process.cwd(),
      "denyok.json"
    )) as PackageConfiguration;
  } catch (e) {
    return null;
  }
};
