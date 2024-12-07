import { EOL, strToNum } from "./lib/utils";

type Equation = {
  testValue: number;
  numbers: number[];
};

function parseInputLine(line: string): Equation {
  const [testValue, numbers] = line.split(":");
  return { testValue: strToNum(testValue), numbers: numbers.trim().split(" ").map(strToNum) };
}

function isValidTest(equation: Equation, includeConcatOp: boolean): boolean {
  let testValues = [equation.numbers[0]];
  for (let i = 1; i < equation.numbers.length; i++) {
    const newTestValues: number[] = [];
    for (const testValue of testValues) {
      newTestValues.push(testValue + equation.numbers[i]);
      newTestValues.push(testValue * equation.numbers[i]);
      if (includeConcatOp) {
        newTestValues.push(strToNum(`${testValue}${equation.numbers[i]}`));
      }
    }
    testValues = newTestValues;
  }
  return testValues.includes(equation.testValue);
}

function solve(input: Equation[], includeConcatenation: boolean): number {
  return input
    .filter((eq) => isValidTest(eq, includeConcatenation))
    .reduce((sum, equation) => sum + equation.testValue, 0);
}

export default async (input: string) => {
  const data = input.split(EOL).map(parseInputLine);

  console.log(`Part 1: The result is: ${solve(data, false)}`);
  console.log(`Part 2: The result is: ${solve(data, true)}`);
};
