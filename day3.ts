import * as fs from "fs";
import * as path from "path";

// getting content from input file
const filePath = path.join(__dirname, "inputs", "day3.txt");
const content = fs.readFileSync(filePath, "utf8");

const pattern = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
let enabled = true;
let sum = 0;
let match;

while ((match = pattern.exec(content)) !== null) {
  if (match[0] === "do()") {
    enabled = true;
  } else if (match[0] === "don't()") {
    enabled = false;
  } else if (match[0].startsWith("mul(") && enabled) {
    sum += Number(match[1]) * Number(match[2]);
  }
}

console.log(sum);
