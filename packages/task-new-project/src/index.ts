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

export const main = (args: Partial<NewProjectOptions>) => {
  console.log(`Creating new project`);
  console.log(`Args:\n`, args);

  console.log(`1. bootstrap folder structure`, args.description);
  console.log(`Creating file...`, typeof createFile);

  return args;
};
