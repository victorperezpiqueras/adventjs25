/* 
Santa’s vertical warehouse has been modernized! Now, in addition to stacking gifts, there’s a robot 🤖 in the warehouse that picks up the gifts if there is a complete row.

The warehouse is a matrix with # gifts and . empty spaces. You must create a clearGifts function that receives the state of the warehouse and an array with the columns where the gifts are dropped.

Drop rules:

The gift falls down the indicated column from the top.
It is placed in the lowest empty cell (.) of that column.
If the column is full, the gift is ignored.
Cleaning robot rule:

If when placing a gift, a row becomes completely filled with gifts (#), that row disappears.
All the rows that were above the removed row move down one position.
When a row is removed, a new empty row (.) appears at the top to keep the warehouse size.
clearGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['#', '.', '#']
  ],
  [1]
)
/*
1. The gift falls in column 1
2. Row 2 becomes [# # #].
3. Row 2 is complete, the robot clears it.
6. A new empty row is added at position 0.

Result:
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
]
*/

/* clearGifts(
  [
    ['.', '.', '#'],
    ['#', '.', '#'],
    ['#', '.', '#']
  ],
  [0, 1, 2]
) */

/*
1. The gift falls in column 0
2. The gift falls in column 1
3. Row 2 becomes [# # #]
4. Row 2 is complete, the robot clears it

For now it looks like this:
[
  ['.', '.', '.']
  ['#', '.', '#'],
  ['#', '.', '#'],
]

5. The gift falls in column 2

Result:
[
  ['.', '.', '#'],
  ['#', '.', '#'],
  ['#', '.', '#']
]
*/

function clearGifts(warehouse: string[][], drops: number[]): string[][] {
  if (warehouse.length <= 0) {
    return warehouse;
  }
  for (let index = 0; index < drops.length; index++) {
    const col = drops[index];
    let depth = warehouse.length - 1;
    while (depth >= 0) {
      const cell = warehouse[depth][col];
      if (cell === ".") {
        warehouse[depth][col] = "#";
        break;
      }
      depth--;
    }

    if (warehouse[depth] && !warehouse[depth || 0].includes(".")) {
      for (let i = depth; i > 0; i--) {
        warehouse[i] = [...warehouse[i - 1]];
      }
      warehouse[0] = Array(warehouse[0].length).fill(".");
    }
  }
  return warehouse;
}

console.log(
  clearGifts(
    [
      [".", ".", "."],
      [".", ".", "."],
      ["#", ".", "#"],
    ],
    [1]
  )
);
/*
1. The gift falls in column 1
2. Row 2 becomes [# # #].
3. Row 2 is complete, the robot clears it.
6. A new empty row is added at position 0.

Result:
[
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.']
]
*/

console.log(
  clearGifts(
    [
      [".", ".", "#"],
      ["#", ".", "#"],
      ["#", ".", "#"],
    ],
    [0, 1, 2]
  )
);

/*
1. The gift falls in column 0
2. The gift falls in column 1
3. Row 2 becomes [# # #]
4. Row 2 is complete, the robot clears it

For now it looks like this:
[
  ['.', '.', '.']
  ['#', '.', '#'],
  ['#', '.', '#'],
]

5. The gift falls in column 2

Result:
[
  ['.', '.', '#'],
  ['#', '.', '#'],
  ['#', '.', '#']
]
*/

console.log(
  clearGifts(
    [
      [".", ".", "."],
      ["#", "#", "."],
      ["#", "#", "."],
    ],
    [2, 2]
  )
);

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐
Code review: 3/5
Strengths:
• The code correctly implements the gift dropping logic.
• TypeScript types are used appropriately.
Weak points:
• The row clearing logic has a bug: it only checks the row where the gift was placed, not all rows after a drop.
• The row clearing logic does not correctly handle multiple row removals in a single drop.
• The condition `!warehouse[depth|| 0].includes(".")` is not robust and can lead to incorrect row clearing.
• The code modifies the input `warehouse` array directly, which can be unexpected behavior for callers.
Next steps:
• Refactor the row clearing logic to iterate through all rows after a gift is placed and check for completeness.
• Ensure that if multiple rows become complete after a single gift drop, all are cleared and rows above shift down.
• Consider creating a new warehouse array instead of modifying the input array in place to improve immutability.
• Add a separate function to check and clear complete rows to improve modularity and readability.
*/
