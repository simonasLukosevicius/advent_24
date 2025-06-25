import * as fs from "fs";
import * as path from "path";

// getting content from input file
const rulesFilePath = path.join(__dirname, "inputs", "day5rules.txt");
const inputFilePath = path.join(__dirname, "inputs", "day5.txt");

const rules = fs.readFileSync(rulesFilePath, "utf8");
const data = fs.readFileSync(inputFilePath, "utf8");

const rulesDataArr = rules
  .split(/\n/)
  .map((rule) => rule.split("|").map((num) => Number(num)));

// console.log(rulesDataArr);

const updatesArr = data
  .split(/\n/)
  .map((update) => update.split(",").map((num) => Number(num)));

const isUpdateValid = (up: number[]): boolean => {
  let validation = true;

  if (up.length === 1) {
    return validation;
  }

  up.forEach((number, index) => {
    const numberRules = rulesDataArr.filter((rule) => rule[0] === number);

    numberRules.forEach(([fir, sec]) => {
      if (up.includes(sec) && up.indexOf(sec) < index) validation = false;
    });
  });

  return validation;
};

const orderList = (up: number[], rules: number[][]): number[] => {
  const dic: Record<string, number[]> = {};

  const orderedList: number[] = [];

  up.forEach((page) => {
    dic[page] = rules
      .filter((rule) => rule[0] === page && up.includes(rule[1]))
      .map((rule) => rule[1]);
  });

  while (Object.keys(dic).length > 0) {
    const lastPage = Number(
      Object.keys(dic).find((key) => dic[key].length === 0)
    );

    for (const key in dic) {
      dic[key] = dic[key].filter((num) => num !== lastPage);
    }

    delete dic[String(lastPage)];

    orderedList.unshift(lastPage);
  }

  return orderedList;
};

const part1 = (updates: number[][]): number => {
  const validUpdates = updates.filter((update) => isUpdateValid(update));

  return validUpdates.reduce((acc, update) => {
    const midleNumber = update[(update.length - 1) / 2];
    return acc + midleNumber;
  }, 0);
};

console.log("Valid updates:", part1(updatesArr));

const part2 = (updates: number[][]): number => {
  const notValidUpdates = updates.filter((update) => !isUpdateValid(update));

  return notValidUpdates.reduce((acc, update) => {
    const orderedUpdate = orderList(update, rulesDataArr);

    const midleNumber = orderedUpdate[Math.floor(orderedUpdate.length / 2)];
    acc += midleNumber;
    return acc;
  }, 0);
};

console.log("Reordered invalid updates:", part2(updatesArr));
