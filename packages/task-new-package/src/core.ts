import * as fs from "fs";

import { createFile } from "@denyok/effect-fs";

interface ChildPackageOptions {
  namespace: string;
}

interface RootPackageOptions {}

type BuildTargets = "node" | "web";

interface Options {
  name: string;
  namespace: string;
  typescript: boolean;
  targets: BuildTargets[];
  test: boolean;
  globalDevDependencies: string[];
  packagesPath: string;
}

const srcCode = (typescript: boolean) =>
  `export const version = () => require("../package.json").version${
    typescript ? " as string" : ""
  };\n`;

const typescriptConfigContent = () => `{
  "extends": "../../tsconfig.json",
  "include": ["src"],
  "exclude": ["node_modules"]
}\n`;

export const main = async (args: Options) => {
  console.log(`This is side effect of a task`);
  console.log(`Got args:\n`, args);

  const { packagesPath } = args;
  const thisPackagePath = `${packagesPath}/${args.name}`;
  const thisPackageSrcPath = `${thisPackagePath}/src`;

  if (packagesPath) {
    if (!fs.existsSync(thisPackagePath)) {
      await fs.mkdirSync(thisPackagePath, { recursive: true });
    }
    if (!fs.existsSync(thisPackageSrcPath)) {
      await fs.mkdirSync(thisPackageSrcPath, { recursive: true });
    }
  }

  createFile(`${thisPackagePath}/package.json`, "lul");
  createFile(
    `${thisPackageSrcPath}/index.${args.typescript ? "ts" : "js"}`,
    srcCode(args.typescript)
  );
  if (args.typescript) {
    createFile(`${thisPackagePath}/typescript.json`, typescriptConfigContent());
  }
};
