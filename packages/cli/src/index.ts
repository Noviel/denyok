const version = () => require("./version").version;

const getProgram = (query: string) => require(query);

const run = (args: string[]) => {
  console.log(`Denyok cli-${version()} is running`, args);
  console.log("cwd", process.cwd());

  const programToRunQuery = args[2];
  try {
    const { version, description, main } = getProgram(programToRunQuery);

    console.log(description(), version());

    main(args);
  } catch (e) {
    console.error("oops", e);
  }
};

export default run;
