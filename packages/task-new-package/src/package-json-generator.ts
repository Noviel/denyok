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

interface GenerationRequiredOptions {
  name: string;
}

export const generate = ({ name }: GenerationRequiredOptions) => {
  return {
    name,
    version: "0.0.0",
    description: "Denyok Project Configuration",
    repository: {
      type: "git",
      url: "https://github.com/noviel/denyok.git"
    },
    author: 'Alexander "snov" Semenchenko',
    main: "pkg/dist-node/index.js",
    types: "pkg/dist-types/index.d.ts",
    publishConfig: {
      access: "public"
    },
    scripts: {
      build: "pika-pack build"
    },
    "@pika/pack": {
      pipeline: [["@pika/plugin-ts-standard-pkg"], ["@pika/plugin-build-node"]]
    },
    devDependencies: {
      "@pika/pack": "^0.5.0",
      "@pika/plugin-build-node": "^0.6.0",
      "@pika/plugin-ts-standard-pkg": "^0.6.0",
      "@pika/types": "^0.6.0",
      "@types/node": "^12.7.3",
      typescript: "^3.6.2"
    }
  };
};
