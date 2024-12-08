import { EOL } from "./lib/utils";

function countAntiNodesPart1(input: string[][], freqRow: number, freqCol: number, antiNodes: Set<string>): void {
  const freq = input[freqRow][freqCol];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (row === freqRow && col === freqCol) continue; // skip self
      if (input[row][col] === freq) {
        let aRow = freqRow - (row - freqRow),
          aCol = freqCol - (col - freqCol);
        if (aRow >= 0 && aRow < input.length && aCol >= 0 && aCol < input[aRow].length) {
          antiNodes.add(`${aRow}:${aCol}`);
        }
      }
    }
  }
}
function countAntiNodesPart2(input: string[][], freqRow: number, freqCol: number, antiNodes: Set<string>): void {
  const freq = input[freqRow][freqCol];
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (row === freqRow && col === freqCol) continue; // skip self
      if (input[row][col] === freq) {
        antiNodes.add(`${row}:${col}`);
        let dRow = row - freqRow,
          dCol = col - freqCol;
        let aRow = row + dRow,
          aCol = col + dCol;
        while (aRow >= 0 && aRow < input.length && aCol >= 0 && aCol < input[aRow].length) {
          antiNodes.add(`${aRow}:${aCol}`);
          aRow = aRow + dRow;
          aCol = aCol + dCol;
        }
      }
    }
  }
}

function solve(
  input: string[][],
  countFn: (input: string[][], freqRow: number, freqCol: number, antiNodes: Set<string>) => void
): number {
  const antiNodes = new Set<string>();
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] !== ".") {
        countFn(input, row, col, antiNodes);
      }
    }
  }
  return [...antiNodes.values()].length;
}

export default async (input: string) => {
  const data = input.split(EOL).map((line) => line.split(""));

  console.log(`Part 1: The result is: ${solve(data, countAntiNodesPart1)}`);
  console.log(`Part 2: The result is: ${solve(data, countAntiNodesPart2)}`);
};
