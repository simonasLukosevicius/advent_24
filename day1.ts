import * as fs from "fs";
import * as path from "path";

const compare = (a: number, b: number) => {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
};

// getting content from input file
const filePath = path.join(__dirname, "..", "inputs", "day1.txt");
const content = fs.readFileSync(filePath, "utf8");

// creating two lists
const firstList: number[] = [];
const secondList: number[] = [];

const mainList = content
  .split(/ |\n/)
  .filter((el) => el)
  .map((el) => parseInt(el));

mainList.map((el, index) => {
  if (index % 2 === 0) {
    firstList.push(el);
  } else {
    secondList.push(el);
  }
});

// sorting lists from smallest to largest value
firstList.sort(compare);
secondList.sort(compare);

// set total distance
let totalDistance = 0;

// loop throug lists and sum total distance between them
firstList.forEach((val, index) => {
  const diff = Math.abs(val - secondList[index]);

  totalDistance += diff;
});

// print result
console.log(totalDistance);
