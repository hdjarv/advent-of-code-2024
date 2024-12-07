import { EOL } from "./lib/utils";

function countXmasesAtCoord(input: string[][], row: number, col: number): number {
  let result = 0;
  // direction: →
  if (
    col < input[row].length - 3 &&
    input[row][col] === "X" &&
    input[row][col + 1] === "M" &&
    input[row][col + 2] === "A" &&
    input[row][col + 3] === "S"
  ) {
    result++;
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
    result++;
  }

  // direction: ↓
  if (
    row < input[row].length - 3 &&
    input[row][col] === "X" &&
    input[row + 1][col] === "M" &&
    input[row + 2][col] === "A" &&
    input[row + 3][col] === "S"
  ) {
    result++;
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
    result++;
  }

  // direction: ⟵
  if (
    col >= 3 &&
    input[row][col] === "X" &&
    input[row][col - 1] === "M" &&
    input[row][col - 2] === "A" &&
    input[row][col - 3] === "S"
  ) {
    result++;
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
    result++;
  }

  // direction: ↑
  if (
    row >= 3 &&
    input[row][col] === "X" &&
    input[row - 1][col] === "M" &&
    input[row - 2][col] === "A" &&
    input[row - 3][col] === "S"
  ) {
    result++;
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
    result++;
  }

  return result;
}

function countX_masesAtCoord(input: string[][], row: number, col: number): number {
  let result = 0;
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
      result++;
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
      result++;
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
      result++;
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
      result++;
    }
  }
  return result;
}

function solve(input: string[][], countFn: (input: string[][], row: number, col: number) => number): number {
  let result = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      result += countFn(input, row, col);
    }
  }

  return result;
}

export default async (input: string) => {
  const data = input.split(EOL).map((s) => s.split(""));

  console.log(`Part 1: The result is: ${solve(data, countXmasesAtCoord)}`);
  console.log(`Part 2: The result is: ${solve(data, countX_masesAtCoord)}`);
};
