import * as fs from "fs";
import * as path from "path";

// getting content from input file
const filePath = path.join(__dirname, "inputs", "day4.txt");
const content = fs.readFileSync(filePath, "utf8");

// test 2D array with MAS words
const testContent = [
  ["M", "A", "S", "S"],
  ["X", "A", "A", "M"],
  ["M", "A", "S", "M"],
];

// tranforming to nested arrays
const transformedContent = content
  .split(/\n/)
  .map((string) => Array.from(string));

const searchingForPart1 = "XMAS";
const MAS = "MAS";

function checkLines(lines: string[][], regex: RegExp): number {
  let count = 0;

  for (const line of lines) {
    const strPos = line.join("");
    const strNeg = [...line].reverse().join("");

    count += (strPos.match(regex) || []).length;
    count += (strNeg.match(regex) || []).length;
  }

  return count;
}

function getVerticalLines(data: string[][]): string[][] {
  const result: string[][] = [];

  for (let col = 0; col < data[0].length; col++) {
    const verticalLine: string[] = [];
    for (let row = 0; row < data.length; row++) {
      verticalLine.push(data[row][col]);
    }
    result.push(verticalLine);
  }

  return result;
}

function getDiagonals(data: string[][], isForwardSlash: boolean): string[][] {
  const rows = data.length;
  const cols = data[0].length;
  const result: string[][] = [];

  if (isForwardSlash) {
    // Forward slash (/) diagonals
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        const pos = j + rows - i - 1;
        if (!result[pos]) result[pos] = [];
        result[pos].push(data[i][j]);
      }
    }
  } else {
    // Backslash (\) diagonals
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const pos = i + j;
        if (!result[pos]) result[pos] = [];
        result[pos].push(data[i][j]);
      }
    }
  }

  return result;
}

export const findXMASWordsCount = (
  data: string[][],
  searchingFor: string
): number => {
  let count = 0;
  const regex = new RegExp(searchingFor, "g");

  // Check horizontally
  count += checkLines(data, regex);

  // Check vertically
  const verticalLines = getVerticalLines(data);
  count += checkLines(verticalLines, regex);

  // Check diagonally (/)
  const diagonalsForward = getDiagonals(data, true);
  count += checkLines(diagonalsForward, regex);

  // Check diagonally (\)
  const diagonalsBackward = getDiagonals(data, false);
  count += checkLines(diagonalsBackward, regex);

  return count;
};

//=============================================================================

type Position = {
  row: number;
  col: number;
};

// get A positions in array. Exlude edges
// eg.: A position: [ { row: 1, col: 1 }, { row: 1, col: 2 } ]
const getACharPositions = (data: string[][]): Position[] => {
  const positions: Position[] = [];
  const rows = data.length;
  const cols = data[0].length;

  for (let r = 1; r < rows - 1; ++r) {
    for (let c = 1; c < cols - 1; ++c) {
      if (data[r][c] === "A") {
        positions.push({ row: r, col: c });
      }
    }
  }

  return positions;
};

const countMAS = (data: string[][], aCharPos: Position[]): number => {
  let masCount = 0;
  aCharPos.forEach(({ row, col }) => {
    console.log(row, col);

    // (/) MAS
    const string1 = `${data[row + 1][col - 1]}A${data[row - 1][col + 1]}`;
    const string1Rev = [...string1].reverse().join("");

    // (\) MAS
    const string2 = `${data[row - 1][col - 1]}A${data[row + 1][col + 1]}`;
    const string2Rev = [...string2].reverse().join("");

    if (
      (string1 === MAS || string1Rev === MAS) &&
      (string2 === MAS || string2Rev === MAS)
    ) {
      masCount += 1;
    }
  });

  return masCount;
};

// console.log(
//   "Found XMAS words:",
//   findXMASWordsCount(transformedContent, searchingForPart1)
// );

// console.log(transformedContent);

// console.log(getACharPositions(transformedContent));

console.log(
  "MAS crosses found",
  countMAS(transformedContent, getACharPositions(transformedContent))
);
