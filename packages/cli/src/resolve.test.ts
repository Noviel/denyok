import { resolve } from "./resolve";

describe("resolve program", () => {
  it.skip("should resolve global program", () => {});
  it("should resolve local program", () => {
    const { main } = resolve("./src/mocks/program.ts");
    expect(main()).toBe("MainResult");
  });
});
