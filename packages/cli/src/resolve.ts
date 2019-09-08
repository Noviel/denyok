const path = require("path");

export const resolve = (query: string) => {
  if (query.startsWith(".")) {
    return require(path.resolve(process.cwd(), query));
  } else if (query.startsWith("internal:")) {
    return {
      version() {
        return "0.0.1";
      },
      description() {
        return "PoC of internal programs";
      },
      main(args: string[]) {
        console.log("Internal program main", args);
      }
    };
  } else {
    return require(query);
  }
};
