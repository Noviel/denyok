const run = (args: string[]) => {
  console.log(`Denyok cli is running`, args);
  try {
    const { version, description } = require(args[2]);
    console.log(description(), version());
  } catch (e) {
    console.error('oops', e);
  }
};

export default run;
