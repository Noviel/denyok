import * as fs from "fs";
import * as path from "path";

import { getProjectConfig, PackageConfiguration } from "@denyok/config-project";
import { createFile } from "@denyok/effect-fs";

import { generate } from "./package-json-generator";

type BuildTargets = "node" | "web";

interface Options {
  typescript: boolean;
  targets: BuildTargets[];
  test: boolean;
  globalDevDependencies: string[];
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

export const main = async (args: Options & PackageConfiguration) => {
  const configFromFile = await getProjectConfig();
  /* If there is configuration stored in working folder — infer project's properties from it */
  if (configFromFile) {
    if (configFromFile.kind === "MonorepoRoot") {
      console.log(`You are inside monorepo project. Adding package to it.`);

      const packagesPath = configFromFile.packagesRoots[0];
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

      createFile(
        `${thisPackagePath}/package.json`,
        jsonToFileContent(generate({ name: args.name }))
      );
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
    } else {
      console.log(
        `Found "denyok.json", but it is not "MonorepoRoot".It is unsafe to add package from this context`
      );
    }
  } else {
    console.log(`Create "denyok.json" with configuration.`);
    /* If there is no persistent config — input arguments is the only source of project's configuration */
  }
};
