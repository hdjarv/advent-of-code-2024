import { EOL, sortAscending, strToNum } from "./lib/utils";

function solvePart1(input: number[][]): number {
  const list1 = input[0].sort(sortAscending);
  const list2 = input[1].sort(sortAscending);

  let result = 0;
  for (let i = 0; i < list1.length; i++) {
    result += Math.abs(list1[i] - list2[i]);
  }

  return result;
}

function solvePart2(input: number[][]): number {
  const scores = input[0].map((n1) => n1 * input[1].filter((n2) => n1 == n2).length);
  return scores.reduce((val, res) => res + val, 0);
}

export default async (input: string) => {
  const data = input
    .split(EOL)
    .map((str) => str.split(/\W+/))
    .map((pair) => pair.map(strToNum))
    .reduce<number[][]>(
      (res, pair) => {
        res[0].push(pair[0]);
        res[1].push(pair[1]);
        return res;
      },
      [[], []]
    );

  console.log(`Part 1: The result is: ${solvePart1(data)}`);
  console.log(`Part 2: The result is: ${solvePart2(data)}`);
};
