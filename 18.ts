/* 
The Christmas lights panel 🎄✨ in the workshop has been a total success. But the elves want to go one step further: now they want to detect whether there is a line of 4 lights of the same color also on a diagonal.

The panel is still a matrix where each cell can be:

'.' → light off
'R' → red light
'G' → green light
Now your function must return true if there is a line of 4 lights of the same color that are on and aligned, whether horizontally ↔, vertically ↕ or diagonally ↘↙.

hasFourInARow([
  ['R', '.', '.', '.'],
  ['.', 'R', '.', '.'],
  ['.', '.', 'R', '.'],
  ['.', '.', '.', 'R']
])
// true → there are 4 red lights in a ↘ diagonal

hasFourInARow([
  ['.', '.', '.', 'G'],
  ['.', '.', 'G', '.'],
  ['.', 'G', '.', '.'],
  ['G', '.', '.', '.']
])
// true → there are 4 green lights in a ↙ diagonal

hasFourInARow([
  ['R', 'R', 'R', 'R'],
  ['G', 'G', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
])
// true → there are 4 red lights in a horizontal line

hasFourInARow([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
])
// false → there are no 4 consecutive lights of the same color
Note: The board can be any size.
 */

function hasFourInARow(board: string[][]): boolean {
  const columns = board[0].map((_, i) => board.map((row) => row[i]));

  const diagonals = [
    board.map((_, i) => board[i][i]),
    board.map((_, i) => board[board.length - i - 1][i]),
  ];

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
  const diagonalsMatch = checkLines(diagonals);
  return rowsMatch || colsMatch || diagonalsMatch;
}

console.log(
  hasFourInARow([
    ["R", ".", ".", "."],
    [".", "R", ".", "."],
    [".", ".", "R", "."],
    [".", ".", ".", "R"],
  ])
);
// true → there are 4 red lights in a ↘ diagonal

console.log(
  hasFourInARow([
    [".", ".", ".", "G"],
    [".", ".", "G", "."],
    [".", "G", ".", "."],
    ["G", ".", ".", "."],
  ])
);
// true → there are 4 green lights in a ↙ diagonal

console.log(
  hasFourInARow([
    ["R", "R", "R", "R"],
    ["G", "G", ".", "."],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
  ])
);
// true → there are 4 red lights in a horizontal line

console.log(
  hasFourInARow([
    ["R", "G", "R"],
    ["G", "R", "G"],
    ["G", "R", "G"],
  ])
);
// false → there are no 4 consecutive lights of the same color

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐
Code review: 4/5
Strengths:
• The code correctly identifies horizontal, vertical, and main diagonal lines of four.
• The use of a helper function `checkLines` promotes modularity.
• TypeScript types are used appropriately.
Weak points:
• The current diagonal extraction only considers the two main diagonals. It does not account for all possible diagonals in a matrix.
• The `checkLines` function has a cyclomatic complexity of 14, which is on the higher side and could be simplified.
Next steps:
• Implement logic to extract all possible diagonals (both top-left to bottom-right and top-right to bottom-left) from the board.
• Consider refactoring the `checkLines` function to reduce its cyclomatic complexity, perhaps by breaking down the inner loop logic or using more functional approaches.
*/
