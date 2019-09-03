import * as fs from "fs";
import { createFile } from "@denyok/effect-fs";

export const version = () => require("../package").version as string;

export const description = () => require("../package").description as string;

/* 
 To bootstrap new project we need to create rescpectul structrure in file system
*/

interface NewProjectOptions {
  isMonorepo: boolean;
  version: string;
  description: string;
  namespace: string;
  name: string;
  homepage: string;
  repository: {
    type: string;
    url: string;
  };
  typescript: boolean;
  packagesFolders: string[];
  author: string;
  license: string;
}

interface RunOptions {
  rootPath: string;
}

const mapOptionsToPackageJsonLike = (options: NewProjectOptions) => {
  return {
    name: "unknown",
    description: options.description,
  };
};

export const main = async (args: NewProjectOptions & RunOptions) => {
  console.log(`Creating new project`);
  console.log(`Args:\n`, args);

  const packageJsonContent = mapOptionsToPackageJsonLike(args);

  const rootPath = args.rootPath || '';

  if (rootPath) {
    await fs.mkdirSync(rootPath);
  }

  console.log(`1. bootstrap folder structure`, args.description);
  console.log(
    `Creating file...`,
    createFile(
      `${rootPath}/package.json`,
      JSON.stringify(packageJsonContent, undefined, 2)
    )
  );

  console.log(
    `Creating denyok.json file...`,
    createFile(
      `${rootPath}/denoyk.json`,
      JSON.stringify(args, undefined, 2)
    )
  );

  return args;
};
