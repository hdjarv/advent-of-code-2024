import { EOL, strToNum } from "./lib/utils";

function isReportSafe(report: number[]): boolean {
  let prev = report[0];
  const asc = prev < report[1];
  for (let i = 1; i < report.length; i++) {
    const cur = report[i];
    const diff = Math.abs(cur - prev);
    if ((asc && cur < prev) || (!asc && cur > prev) || diff < 1 || diff > 3) {
      return false;
    }
    prev = cur;
  }
  return true;
}

function solvePart1(input: number[][]): number {
  return input.filter(isReportSafe).length;
}

function solvePart2(input: number[][]): number {
  return input.filter((report) => {
    if (isReportSafe(report)) return true;

    for (let i = 0; i < report.length; i++) {
      const newReport = [...report];
      newReport.splice(i, 1);
      if (isReportSafe(newReport)) return true;
    }
  }).length;
}

export default async (input: string) => {
  const data = input.split(EOL).map((s) => s.split(" ").map(strToNum));

  console.log(`Part 1: The result is: ${solvePart1(data)}`);
  console.log(`Part 2: The result is: ${solvePart2(data)}`);
};
