import * as fs from "fs";
import * as path from "path";

type LevelDirection = "increasing" | "decreasing" | "unsafe";

const setDirection = (a: number, b: number) => {
  return a < b ? "increasing" : a > b ? "decreasing" : "unsafe";
};

const MAX_DIFF = 3;

// getting content from input file
const filePath = path.join(__dirname, "..", "inputs", "day2.txt");
const content = fs.readFileSync(filePath, "utf8");

// creating nested list to work with
const nestedList = content
  .split(/\n/)
  .map((el) => el.split(" "))
  .map((strArr) => strArr.map((str) => parseInt(str)));

// creating safe count variable
let safeCount = 0;

nestedList.forEach((report) => {
  if (report[0] === report[1] || Math.abs(report[0] - report[1]) > MAX_DIFF) {
    return;
  }

  let direction: LevelDirection;

  if (report[0] - report[1] > 0) {
    direction = "decreasing";
  } else {
    direction = "increasing";
  }

  report.forEach((number, index, array) => {
    if (index === array.length - 1) return;

    if (setDirection(number, array[index + 1]) !== direction) {
      direction = "unsafe";
    }

    if (Math.abs(number - array[index + 1]) > MAX_DIFF) {
      direction = "unsafe";
    }
  });

  if (direction === "decreasing" || direction === "increasing") {
    safeCount += 1;
  }
});

console.log(safeCount);
