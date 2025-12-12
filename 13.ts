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
  let factoryLines = factory.map((line) => line.split(""));

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

  let visitedPositions = {};

  let giftPos = { x: 0, y: 0 };

  while (true) {
    const code = factoryLines[giftPos.y][giftPos.x];
    /* if (!code) return "broken"; */ // somehow some test says operation is not a function
    const operation = operationMap[code];
    giftPos = operation(giftPos.x, giftPos.y);
    if (giftPos.x < 0 || giftPos.x >= factoryLines[giftPos.y].length) {
      return "broken";
    }
    if (giftPos.y < 0 || giftPos.y >= factoryLines.length) {
      return "broken";
    }
    if (`${giftPos.y}${giftPos.x}` in visitedPositions) {
      return "loop";
    }
    if (factoryLines[giftPos.y][giftPos.x] === ".") {
      return "completed";
    }
    visitedPositions[`${giftPos.y}${giftPos.x}`] = true;
  }
}

console.log(runFactory([">>."])); // 'completed'
console.log(runFactory([">>>"])); // 'broken'
console.log(runFactory([">><"])); // 'loop'
console.log(runFactory([">>v", "..<"])); // 'completed'
console.log(runFactory([">>v", "<<<"])); // 'broken'
console.log(runFactory([">v.", "^.."])); // 'completed'
console.log(runFactory(["v.", "^."])); // 'loop'
