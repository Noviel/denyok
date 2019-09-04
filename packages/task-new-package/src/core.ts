import * as fs from "fs";
import * as path from "path";

import { projectConfig } from "@denyok/config-project";
import { createFile } from "@denyok/effect-fs";

import { generate } from "./package-json-generator";

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

const jsonToFileContent = (json: object) => JSON.stringify(json, null, 2);

const typescriptConfig = (level: number = 2) => ({
  extends: `${"../".repeat(level) || "./"}tsconfig.json`,
  include: ["src"],
  exclude: ["node_modules"]
});

export const main = async (args: Options) => {
  console.log(`This is side effect of a task`);
  console.log(`Got args:\n`, args);

  const config = await projectConfig();

  const packagesPath = args.packagesPath || config.packagesPaths[0];
  const thisPackagePath = `${packagesPath}/${args.name}`;
  const thisPackageSrcPath = `${thisPackagePath}/src`;

  const packagesPathToLevel = (packagesPath: string) =>
    packagesPath === "" || packagesPath === "." || packagesPath === "./"
      ? 1
      : (packagesPath.match(/[^.]\//g) || []).length + 2;

  if (packagesPath) {
    if (!fs.existsSync(thisPackagePath)) {
      await fs.mkdirSync(thisPackagePath, { recursive: true });
    }
    if (!fs.existsSync(thisPackageSrcPath)) {
      await fs.mkdirSync(thisPackageSrcPath, { recursive: true });
    }
  }

  createFile(`${thisPackagePath}/package.json`, generate({ name: args.name }));
  createFile(
    `${thisPackageSrcPath}/index.${args.typescript ? "ts" : "js"}`,
    srcCode(args.typescript)
  );
  if (args.typescript) {
    createFile(
      `${thisPackagePath}/tsconfig.json`,
      jsonToFileContent(typescriptConfig(packagesPathToLevel(packagesPath)))
    );
  }
};
