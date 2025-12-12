/* 
The Grinch wants to steal the Christmas presents from the warehouse. To do this, he needs to know which presents are not under surveillance.

The warehouse is represented as an array of strings (string[]), where each present (*) is protected if its position is next to a camera (#). Each empty space is represented with a dot (.).

Your task is to count how many presents are not under surveillance, meaning they do not have any adjacent camera (up, down, left, or right).

Keep in mind: only the 4 cardinal directions are considered "adjacent", not diagonals.

Presents in the corners or at the edges can be unguarded, as long as they do not have cameras directly next to them.

findUnsafeGifts([
  '.*.',
  '*#*',
  '.*.'
]) // ➞ 0

// All presents are next to a camera

findUnsafeGifts([
  '...',
  '.*.',
  '...'
]) // ➞ 1

// This present has no cameras around

findUnsafeGifts([
  '*.*',
  '...',
  '*#*'
]) // ➞ 2
// The presents in the top corners have no cameras around

findUnsafeGifts([
  '.....',
  '.*.*.',
  '..#..',
  '.*.*.',
  '.....'
]) // ➞ 4

// The four presents have no cameras, because they are diagonal to the camera
*/

function findUnsafeGifts(warehouse: string[]): number {
  let counter = 0;
  let warehouseMatrix = warehouse.map((line) => line.split(""));

  for (let i = 0; i < warehouseMatrix.length; i++) {
    const line = warehouseMatrix[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] !== "*") {
        continue;
      }
      const up = i === 0 ? "" : warehouseMatrix[i - 1][j];
      const down =
        i === warehouseMatrix.length - 1 ? "" : warehouseMatrix[i + 1][j];
      const left = j === 0 ? "" : warehouseMatrix[i][j - 1];
      const right = j === line.length - 1 ? "" : warehouseMatrix[i][j + 1];
      if (![right, left, up, down].includes("#")) {
        counter++;
      }
    }
  }
  return counter;
}

console.log(findUnsafeGifts([".*.", "*#*", ".*."])); // ➞ 0

// All presents are next to a camera

console.log(findUnsafeGifts(["...", ".*.", "..."])); // ➞ 1

// This present has no cameras around

console.log(findUnsafeGifts(["*.*", "...", "*#*"])); // ➞ 2
// The presents in the top corners have no cameras around

console.log(findUnsafeGifts([".....", ".*.*.", "..#..", ".*.*.", "....."])); // ➞ 4

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly identifies and counts unsafe gifts by checking adjacent cells.
• The use of nested loops and conditional checks is clear and efficient for this problem.
• TypeScript types are used appropriately, and the logic is easy to follow.
• Edge cases like presents at the boundaries of the warehouse are handled correctly.
*/
