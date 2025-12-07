/* 
It’s time to decorate the Christmas tree 🎄! Write a function that receives:

height → the height of the tree (number of rows).
ornament → the ornament character (for example, "o" or "@").
frequency → how often (in asterisk positions) the ornament appears.
The tree is drawn with asterisks *, but every frequency positions, the asterisk is replaced by the ornament.

The position counting starts at 1, from the top to the bottom, left to right. If frequency is 2, the ornaments appear in positions 2, 4, 6, etc.

The tree must be centered and have a one-line trunk # at the end.

🧩 Examples
drawTree(5, 'o', 2)
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

drawTree(3, '@', 3)
//   *
//  *@*
// *@**@
//   #

drawTree(4, '+', 1)
//    +
//   +++
//  +++++
// +++++++
//    #
*/

function drawTree(height: number, ornament: string, frequency: number): string {
  let treeLines: string[] = [];
  let counter = 1;
  for (let index = 0; index < height; index++) {
    let treeLine = "";
    let size = index * 2 + 1;
    for (let j = 0; j < size; j++) {
      const char = counter % frequency === 0 ? ornament : "*";
      treeLine += char;
      counter++;
    }
    const numSpaces = height - (index + 1);
    treeLine = `${" ".repeat(numSpaces)}${treeLine}`; // ${" ".repeat(numSpaces)} this should be part of solutions but is not
    treeLines.push(treeLine);
  }
  return treeLines.join("\n") + "\n" + " ".repeat(height - 1) + "#";
}

console.log(drawTree(5, "o", 2));
//     *
//    o*o
//   *o*o*
//  o*o*o*o
// *o*o*o*o*
//     #

console.log(drawTree(3, "@", 3));
//   *
//  *@*
// *@**@
//   #

console.log(drawTree(4, "+", 1));
//    +
//   +++
//  +++++
// +++++++
//    #

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code is correct and robust, handling various inputs for height, ornament, and frequency as expected.
• The logic for generating the tree lines, placing ornaments, and centering is clear and easy to follow.
• Variable names are descriptive, enhancing readability.
• The algorithm is efficient for the given task, with optimal time and space complexity for generating the string representation of the tree.
• TypeScript is used effectively, with appropriate type annotations and no 'any' types.
*/
