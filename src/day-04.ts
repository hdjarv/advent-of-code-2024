import { EOL } from "./lib/utils";

function countXmasesAtCoord(input: string[][], row: number, col: number): number {
  let res = 0;
  // direcion: →
  if (
    col < input[row].length - 3 &&
    input[row][col] === "X" &&
    input[row][col + 1] === "M" &&
    input[row][col + 2] === "A" &&
    input[row][col + 3] === "S"
  ) {
    res++;
  }
  // direction: ↘︎
  if (
    row < input.length - 3 &&
    col < input[row].length - 3 &&
    input[row][col] === "X" &&
    input[row + 1][col + 1] === "M" &&
    input[row + 2][col + 2] === "A" &&
    input[row + 3][col + 3] === "S"
  ) {
    res++;
  }

  // direction: ↓
  if (
    row < input[row].length - 3 &&
    input[row][col] === "X" &&
    input[row + 1][col] === "M" &&
    input[row + 2][col] === "A" &&
    input[row + 3][col] === "S"
  ) {
    res++;
  }

  // direction: ↙︎
  if (
    row < input.length - 3 &&
    col >= 3 &&
    input[row][col] === "X" &&
    input[row + 1][col - 1] === "M" &&
    input[row + 2][col - 2] === "A" &&
    input[row + 3][col - 3] === "S"
  ) {
    res++;
  }

  // direction: ⟵
  if (
    col >= 3 &&
    input[row][col] === "X" &&
    input[row][col - 1] === "M" &&
    input[row][col - 2] === "A" &&
    input[row][col - 3] === "S"
  ) {
    res++;
  }

  // direction: ↖︎
  if (
    row >= 3 &&
    col >= 3 &&
    input[row][col] === "X" &&
    input[row - 1][col - 1] === "M" &&
    input[row - 2][col - 2] === "A" &&
    input[row - 3][col - 3] === "S"
  ) {
    res++;
  }

  // direction: ↑
  if (
    row >= 3 &&
    input[row][col] === "X" &&
    input[row - 1][col] === "M" &&
    input[row - 2][col] === "A" &&
    input[row - 3][col] === "S"
  ) {
    res++;
  }

  // direction: ↗︎
  if (
    row >= 3 &&
    col < input[row].length - 3 &&
    input[row][col] === "X" &&
    input[row - 1][col + 1] === "M" &&
    input[row - 2][col + 2] === "A" &&
    input[row - 3][col + 3] === "S"
  ) {
    res++;
  }

  return res;
}

function countX_masesAtCoord(input: string[][], row: number, col: number): number {
  let res = 0;
  if (row >= 1 && row < input.length - 1 && col >= 1 && col < input[row].length - 1) {
    // direction: ↘︎ & ↗︎
    if (
      input[row - 1][col - 1] === "M" &&
      input[row][col] === "A" &&
      input[row + 1][col + 1] === "S" &&
      input[row + 1][col - 1] === "M" &&
      input[row][col] === "A" &&
      input[row - 1][col + 1] === "S"
    ) {
      res++;
    }

    // direction: ↙︎ & ↖︎
    if (
      input[row - 1][col + 1] === "M" &&
      input[row][col] === "A" &&
      input[row + 1][col - 1] === "S" &&
      input[row + 1][col + 1] === "M" &&
      input[row][col] === "A" &&
      input[row - 1][col - 1] === "S"
    ) {
      res++;
    }

    // direction: ↘︎ & ↙︎
    if (
      input[row - 1][col - 1] === "M" &&
      input[row][col] === "A" &&
      input[row + 1][col + 1] === "S" &&
      input[row - 1][col + 1] === "M" &&
      input[row][col] === "A" &&
      input[row + 1][col - 1] === "S"
    ) {
      res++;
    }

    // direction: ↗︎ & ↖︎
    if (
      input[row + 1][col - 1] === "M" &&
      input[row][col] === "A" &&
      input[row - 1][col + 1] === "S" &&
      input[row + 1][col + 1] === "M" &&
      input[row][col] === "A" &&
      input[row - 1][col - 1] === "S"
    ) {
      res++;
    }
  }
  return res;
}

function solve(input: string[][], cb: (input: string[][], row: number, col: number) => number): number {
  let res = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      res += cb(input, row, col);
    }
  }

  return res;
}

export default async (input: string) => {
  const data = input.split(EOL).map((s) => s.split(""));

  console.log(`Part 1: The result is: ${solve(data, countXmasesAtCoord)}`);
  console.log(`Part 2: The result is: ${solve(data, countX_masesAtCoord)}`);
};
