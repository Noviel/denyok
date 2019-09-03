const getProgram = (query: string) => require(query);

const run = (args: string[]) => {
  console.log(`Denyok cli is running`, args);
  const programToRunQuery = args[2];
  try {
    const { version, description, main } = getProgram(programToRunQuery);

    console.log(description(), version());
    console.log('cwd', process.cwd());

    main(args);
  } catch (e) {
    console.error("oops", e);
  }
};

export default run;
