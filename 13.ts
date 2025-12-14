/* 
Simulate the path of a gift inside a factory and return how it ends. To do this, you must create a function runFactory(factory).

factory is a string[] where each cell can be:

> < ^ v movements
. correct exit
Keep in mind that all rows have the same length and that there will be no other symbols.

The gift always starts at position (0,0) (top left). At each step it reads the current cell and moves according to the direction. If it reaches a cell with a dot (.) it means it has correctly exited the factory.

Result

Return one of these values:

'completed' if it reaches a .
'loop' if it visits a position twice
'broken' if it goes outside the board
Examples

runFactory([
  '>>.'
]) // 'completed'

runFactory([
  '>>>'
]) // 'broken'

runFactory([
  '>><'
]) // 'loop'

runFactory([
  '>>v',
  '..<'
]) // 'completed'

runFactory([
  '>>v',
  '<<<'
]) // 'broken'

runFactory([
  '>v.',
  '^..'
]) // 'completed'

runFactory([
  'v.',
  '^.'
]) // 'loop'
*/

type Factory = string[];
type Result = "completed" | "broken" | "loop";

function runFactory(factory: Factory): Result {
  const operationMap = {
    ">": (x, y) => {
      return { x: x + 1, y };
    },
    "<": (x, y) => {
      return { x: x - 1, y };
    },
    "^": (x, y) => {
      return { x, y: y - 1 };
    },
    v: (x, y) => {
      return { x, y: y + 1 };
    },
  };

  let visitedPositions = new Set<string>();

  let giftPos = { x: 0, y: 0 };

  while (true) {
    if (factory[giftPos.y][giftPos.x] === ".") {
      return "completed";
    }
    const code = factory[giftPos.y][giftPos.x];
    if (!(code in operationMap)) {
      return "broken";
    }
    const operation = operationMap[code];
    giftPos = operation(giftPos.x, giftPos.y);

    if (giftPos.y < 0 || giftPos.y >= factory.length) {
      return "broken";
    }

    if (giftPos.x < 0 || giftPos.x >= factory[giftPos.y].length) {
      return "broken";
    }

    if (visitedPositions.has(`${giftPos.y}${giftPos.x}`)) {
      return "loop";
    }
    visitedPositions.add(`${giftPos.y}${giftPos.x}`);
  }
}

console.log(runFactory([">>."])); // 'completed'
console.log(runFactory([">>>"])); // 'broken'
console.log(runFactory([">><"])); // 'loop'
console.log(runFactory([">>v", "..<"])); // 'completed'
console.log(runFactory([">>v", "<<<"])); // 'broken'
console.log(runFactory([">v.", "^.."])); // 'completed'
console.log(runFactory(["v.", "^."])); // 'loop'

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly simulates the factory path and handles all specified exit conditions.
• The use of a Set for tracking visited positions is efficient for loop detection.
• TypeScript types are used appropriately, and the code is well-structured.
*/
