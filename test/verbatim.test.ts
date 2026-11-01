import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
const read = (p: string) => readFileSync(new URL(p, import.meta.url), "utf8");
test("src/tw-animate.css is upstream source verbatim", () =>
  expect(read("../src/tw-animate.css")).toBe(read("../upstream/src/tw-animate.css")));
test("license is upstream's", () => expect(read("../src/LICENSE")).toBe(read("../upstream/LICENSE")));
