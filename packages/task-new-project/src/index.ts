export const version = () => require('../package').version as string;

export const description = () => require('../package').description as string;

export const main = (args: string[]) => {
  console.log(`Creating new project`)
  console.log(`Args:\n`, args);

  return args;
}