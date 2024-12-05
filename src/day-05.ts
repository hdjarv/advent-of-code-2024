import { EOL, strToNum } from "./lib/utils";

type Rule = [number, number];

type Input = {
  rules: Rule[];
  updates: number[][];
};

function fixIncorrectUpdates(updates: number[][], rules: Rule[]): number[][] {
  const result: number[][] = [];
  for (let update of updates) {
    result.push(
      // spread because sort() works in-place
      [...update].sort((a, b) => {
        const pageRule = rules.find((rule) => (rule[0] === a || rule[1] === a) && (rule[0] === b || rule[1] === b));
        if (!pageRule) throw Error(`No rule found for: ${a} & ${b}`);

        if (a === pageRule[0]) return -1;
        if (b === pageRule[1]) return 1;
        return 0;
      })
    );
  }
  return result;
}

function isUpdateCorrect(update: number[], rules: Rule[]): boolean {
  const updateRules = rules.filter((rule) => update.includes(rule[0]) && update.includes(rule[1]));
  for (let i = 0; i < update.length; i++) {
    const pageNo = update[i];
    const pageRules = updateRules.filter((rule) => rule[0] === pageNo);
    const pagesAfterCurrent = update.slice(i + 1, update.length);
    for (let pageRule of pageRules) {
      if (!pagesAfterCurrent.includes(pageRule[1])) {
        return false;
      }
    }
  }
  return true;
}

function parseInput(input: string): Input {
  const result: Input = { rules: [], updates: [] };
  let inRules = true;
  for (let line of input.split(EOL)) {
    if (line === "") {
      inRules = false;
      continue;
    }
    if (inRules) {
      const rule = line.split("|").map(strToNum);
      result.rules.push([rule[0], rule[1]]);
    } else {
      result.updates.push(line.split(",").map(strToNum));
    }
  }
  return result;
}

function solvePart1(input: Input): number {
  const correctUpdates = input.updates.filter((update) => isUpdateCorrect(update, input.rules));
  return correctUpdates.reduce((res, update) => res + update[Math.floor(update.length / 2)], 0);
}
function solvePart2(input: Input): number {
  const incorrectUpdates = input.updates.filter((update) => !isUpdateCorrect(update, input.rules));
  const correctedUpdates = fixIncorrectUpdates(incorrectUpdates, input.rules);
  return correctedUpdates.reduce((res, update) => res + update[Math.floor(update.length / 2)], 0);
}

export default async (input: string) => {
  const data = parseInput(input);

  console.log(`Part 1: The result is: ${solvePart1(data)}`);
  console.log(`Part 2: The result is: ${solvePart2(data)}`);
};
