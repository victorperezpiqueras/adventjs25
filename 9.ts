/* 
The elves have built a robot vacuum reindeer 🦌 (@) to tidy up the workshop a bit for Christmas.

The reindeer moves on a board to pick things up from the floor (*) and must avoid obstacles (#).

You will receive two parameters:

board: a string that represents the board.
moves: a string with the moves: 'L' (left), 'R' (right), 'U' (up), 'D' (down).
Movement rules:

If the reindeer goes off the board or crashes into an obstacle (#) → return 'crash'.
If the reindeer picks something up from the floor (*) during the moves → return 'success'.
If the reindeer doesn’t pick anything up and doesn’t crash → return 'fail'.
Important: Keep in mind that in the board the first and last lines are blank and must be discarded.

Example:

const board = `
.....
.*#.*
.@...
.....
`

moveReno(board, 'D')
// ➞ 'fail' -> it moves but doesn’t pick anything up

moveReno(board, 'U')
// ➞ 'success' -> it picks something up (*) just above

moveReno(board, 'RU')
// ➞ 'crash' -> it crashes into an obstacle (#)

moveReno(board, 'RRRUU')
// ➞ 'success' -> it picks something up (*)

moveReno(board, 'DD')
// ➞ 'crash' -> it crashes into the bottom of the board

moveReno(board, 'UUU')
// ➞ 'success' -> it picks something up from the floor (*) and then crashes at the top

moveReno(board, 'RR')
// ➞ 'fail' -> it moves but doesn’t pick anything up
*/

type Board = string;
type Moves = string;
type Result = "fail" | "crash" | "success";

function moveReno(board: Board, moves: Moves): Result {
  const boardLines = board.split("\n").map((line) => line.split(""));
  boardLines.shift();
  boardLines.pop();
  let currentPosY = boardLines.findIndex((elem) => elem.includes("@"));
  let currentPosX = boardLines[currentPosY].findIndex((elem) => elem === "@");

  const movesMap = {
    U: (coords: { x: number; y: number }) => {
      coords.y--;
    },
    D: (coords: { x: number; y: number }) => {
      coords.y++;
    },
    L: (coords: { x: number; y: number }) => {
      coords.x--;
    },
    R: (coords: { x: number; y: number }) => {
      coords.x++;
    },
  };

  const actions = {
    "#": "crash",
    "*": "success",
  };

  for (let index = 0; index < moves.length; index++) {
    const move = moves[index];
    let currPos = { x: currentPosX, y: currentPosY };
    movesMap[move](currPos);
    const xOut =
      currPos.x < 0 || currPos.x > boardLines[currentPosY].length - 1;
    const yOut = currPos.y < 0 || currPos.y > boardLines.length - 1;
    if (xOut || yOut) {
      return "crash";
    }
    if (boardLines[currPos.y][currPos.x] in actions) {
      return actions[boardLines[currPos.y][currPos.x]];
    }
    currentPosX = currPos.x;
    currentPosY = currPos.y;
  }
  return "fail";
}

const board = `
.....
.*#.*
.@...
.....
`;

//console.log(moveReno(board, "D"));
// ➞ 'fail' -> it moves but doesn’t pick anything up

//console.log(moveReno(board, "U"));
// ➞ 'success' -> it picks something up (*) just above

//console.log(moveReno(board, "RU"));
// ➞ 'crash' -> it crashes into an obstacle (#)

//console.log(moveReno(board, "RRRUU"));
// ➞ 'success' -> it picks something up (*)

console.log(moveReno(board, "DD"));
// ➞ 'crash' -> it crashes into the bottom of the board

console.log(moveReno(board, "UUU"));
// ➞ 'success' -> it picks something up from the floor (*) and then crashes at the top

console.log(moveReno(board, "RR"));
// ➞ 'fail' -> it moves but doesn’t pick anything up

/* 
Difficulty: hard
Grade: ⭐⭐⭐⭐
Code review: 4/5
Strengths:
• The code correctly parses the board and identifies the reindeer's starting position.
• Movement logic is implemented accurately based on the provided moves.
• Edge cases like going off-board or hitting obstacles are handled correctly.
• The use of maps for moves and actions improves readability.
• TypeScript types are used appropriately.
Weak points:
• The cyclomatic complexity is high (14), primarily due to the loop and conditional checks within it. This can make the function harder to follow and test.
Next steps:
• Consider refactoring the loop to reduce cyclomatic complexity. For example, the boundary checks and obstacle/pickup checks could potentially be extracted into helper functions or handled more concisely.
*/
