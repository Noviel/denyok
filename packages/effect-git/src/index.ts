export const version = () => require("../package.json").version as string;

export const fromGit = (source: string, path: string) => {
  const degit = require('degit');

  const emitter = degit(source, {
    cache: false,
    force: true,
    verbose: true,
  });

  emitter.on('info', (info: { message: string }) => {
    console.log(info.message);
  });

  emitter.clone(path).then(() => {
    console.log('done');
  });
};
