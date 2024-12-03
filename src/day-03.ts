import { strToNum } from "./lib/utils";

type Op = { type: "do" | "don't" } | { type: "mul"; arg1: number; arg2: number };

function parseInput(input: string): Op[] {
  const re = /(?:do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;
  const result: Op[] = [];
  for (let match of input.matchAll(re)) {
    switch (match[0]) {
      case "do()":
        result.push({ type: "do" });
        break;
      case "don't()":
        result.push({ type: "don't" });
        break;
      default:
        result.push({ type: "mul", arg1: strToNum(match[1]), arg2: strToNum(match[2]) });
    }
  }
  return result;
}

function solvePart1(input: Op[]): number {
  return input.filter((op) => op.type === "mul").reduce((res, op) => res + op.arg1 * op.arg2, 0);
}

function solvePart2(input: Op[]): number {
  return input.reduce<{ enabled: Boolean; result: number }>(
    (res, op) => {
      switch (op.type) {
        case "do":
          res.enabled = true;
          break;
        case "don't":
          res.enabled = false;
          break;
        case "mul":
          if (res.enabled) res.result += op.arg1 * op.arg2;
      }
      return res;
    },
    { enabled: true, result: 0 }
  ).result;
}

export default async (input: string) => {
  const data = parseInput(input.replace(/[\n\r]/, ""));

  console.log(`Part 1: The result is: ${solvePart1(data)}`);
  console.log(`Part 2: The result is: ${solvePart2(data)}`);
};
