import * as fs from "fs";
import * as path from "path";

// getting content from input file
const filePath = path.join(__dirname, "inputs", "day2.txt");
const content = fs.readFileSync(filePath, "utf8");

// creating nested list to work with
const nestedList = content
  .split(/\n/)
  .map((el) => el.split(" "))
  .map((strArr) => strArr.map((str) => parseInt(str)));

const isSafe = (report: number[]) => {
  const differences: number[] = [];

  for (let i = 1; i < report.length; i++) {
    differences.push(report[i] - report[i - 1]);
  }

  const increasing = differences.every((d) => d >= 1 && d <= 3);
  const decreasing = differences.every((d) => d <= -1 && d >= -3);

  return increasing || decreasing;
};

const day02 = (reports: number[][]) => {
  let safe = 0;
  let madeSafe = 0;

  for (const report of reports) {
    let tolerable = false;

    for (let i = 0; i < report.length; i++) {
      const removedArrayMember = [
        ...report.slice(0, i),
        ...report.slice(i + 1),
      ];

      if (isSafe(removedArrayMember)) {
        tolerable = true;
        break;
      }
    }

    if (isSafe(report)) safe++;
    if (isSafe(report) || tolerable) madeSafe++;
  }

  return [safe, madeSafe];
};

console.log(day02(nestedList));
