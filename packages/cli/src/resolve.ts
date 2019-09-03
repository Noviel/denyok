const path = require("path");

export const resolve = (query: string) => {
  if (query.startsWith(".")) {
    return require(path.resolve(process.cwd(), query));
  } else {
    return require(query);
  }
};
