import { resolve } from './resolve';

const version = () => require("../package").version;


const run = (args: string[]) => {
  const yargs = require('yargs/yargs')(args.slice(2));

  console.log(`Denyok cli-${version()} is running`, args);
  console.log("cwd", process.cwd());

  let programToRunQuery = args[2];

  try {
    const { version, description, main } = resolve(programToRunQuery);

    console.log(description(), version());

    main(yargs.argv);
  } catch (e) {
    console.error("oops", e);
  }
};

export default run;
