/* 
At the North Pole, they’ve set up a panel of Christmas lights 🎄✨ to decorate the workshop. Each light can be on with a color, or off.

The panel is represented as a matrix where each cell can be:

'.' → light off
'R' → red light
'G' → green light
The elves want to know if there is a line of 4 lights of the same color that are on and aligned on the panel (only horizontal ↔ or vertical ↕). Lights that are off ('.') don’t count.

hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
])
// true → there are 4 red lights horizontally

hasFourLights([
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.']
])
// true → there are 4 green lights vertically

hasFourLights([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
// false → there are no 4 lights of the same color in a row
Note: The board can be any size. No diagonals.
*/

function hasFourLights(board: string[][]): boolean {
  const columns = board[0].map((_, i) => board.map((row) => row[i]));

  function checkLines(lines) {
    for (let i = 0; i < lines.length; i++) {
      let currentLight = null;
      let currentCount = 0;
      for (let j = 0; j < lines[i].length; j++) {
        const light = lines[i][j];
        if (light === currentLight) {
          currentCount++;
          if (currentCount === 4 && currentLight !== ".") {
            return true;
          }
        } else if (light !== ".") {
          currentLight = light;
          currentCount = 1;
        }
      }
    }
    return false;
  }

  const rowsMatch = checkLines(board);
  const colsMatch = checkLines(columns);
  return rowsMatch || colsMatch;
}

console.log(
  hasFourLights([
    [".", ".", ".", ".", "."],
    ["R", "R", "R", "R", "."],
    ["G", "G", ".", ".", "."],
  ])
);
// true → there are 4 red lights horizontally

console.log(
  hasFourLights([
    [".", "G", ".", "."],
    [".", "G", ".", "."],
    [".", "G", ".", "."],
    [".", "G", ".", "."],
  ])
);
// true → there are 4 green lights vertically

console.log(
  hasFourLights([
    ["R", "G", "R"],
    ["G", "R", "G"],
    ["G", "R", "G"],
  ])
);
// false → there are no 4 lights of the same color in a row

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly identifies horizontal and vertical lines of four lights.
• The use of a helper function `checkLines` improves readability and reduces duplication.
• TypeScript types are used appropriately.
• The logic is clear and efficient for the given problem.
*/
