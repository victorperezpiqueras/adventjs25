/* 
Santa Claus 🎅 has to deliver presents in a town represented as a grid map.

Each cell on the map can be:

'S' → Santa's starting point (where the presents are)
'G' → House that must receive a present
'.' → Free path
'#' → Obstacle (cannot be crossed)
Santa makes independent deliveries for each present. He leaves from 'S', delivers the present to a house 'G', and immediately returns to 'S' to pick up the next one. However, for this challenge, we only want to calculate the sum of the minimum one-way distances from 'S' to each house 'G'.

🎯 Your goal
Write the function minStepsToDeliver(map) that returns the total number of steps required to reach all the houses with presents from the starting position.

Keep in mind:

You always start from the initial position 'S'.
For each present, you must calculate the minimum distance from 'S' to that house 'G'.
Obstacles ('#') cannot be crossed.
If any house with a present is unreachable, the function must return -1.
🧩 Examples

minStepsToDeliver([
  ['S', '.', 'G'],
  ['.', '#', '.'],
  ['G', '.', '.']
])
// Result: 4

/* 
Explanation:
- Minimum distance from S (0,0) to G (0,2): 2 steps
- Minimum distance from S (0,0) to G (2,0): 2 steps
- Total: 2 + 2 = 4

minStepsToDeliver([
  ['S', '#', 'G'],
  ['#', '#', '.'],
  ['G', '.', '.']
])
// Result: -1
// (The house at (0,2) is unreachable due to obstacles)

minStepsToDeliver([['S', 'G']])
// Result: 1
🎯 Rules

The map always contains exactly one 'S'.
There can be zero or more houses with presents ('G').
The order of deliveries doesn't matter, as each is measured independently from 'S'.
You must return the sum of the minimum one-way distances.
🧠 Hint

Calculate the shortest distance from 'S' to each 'G' (you can use a Breadth-First Search or BFS algorithm).
If any present has no possible path, the total result is -1.
*/

function minStepsToDeliver(map: string[][]): number {
  let queue = [];
  type Node = {
    distance: number;
    i: number;
    j: number;
    visited: string[];
  };

  function search(node: Node) {
    let i = node.i;
    let j = node.j;
    if (node.visited.includes(`${i}${j}`)) {
      return -1;
    }

    let visited = [...node.visited, `${i}${j}`];

    const neighbourDistance = node.distance + 1;

    if (i > 0 && map[i - 1][j] !== "#") {
      queue.push({
        i: i - 1,
        j,
        distance: neighbourDistance,
        visited,
      });
    }
    if (j > 0 && map[i][j - 1] !== "#") {
      queue.push({
        i: i,
        j: j - 1,
        distance: neighbourDistance,
        visited,
      });
    }
    if (i < map.length - 1 && map[i + 1][j] !== "#") {
      queue.push({
        i: i + 1,
        j: j,
        distance: neighbourDistance,
        visited,
      });
    }
    if (j < map[i].length - 1 && map[i][j + 1] !== "#") {
      queue.push({
        i: i,
        j: j + 1,
        distance: neighbourDistance,
        visited,
      });
    }

    if (map[node.i][node.j] === "G") {
      return node.distance;
    }

    return -1;
  }

  const startingI = map.findIndex((elem) => elem.includes("S"));
  const startingJ = map[startingI].findIndex((elem) => elem === "S");

  let firstNode = {
    i: startingI,
    j: startingJ,
    distance: 0,
    visited: [],
  };
  let bestPaths: Record<string, number> = {};
  queue.push(firstNode);
  while (queue.length > 0) {
    const node = queue.shift();
    const distance = search(node);
    if (distance > 0) {
      bestPaths[`${node.i}${node.j}`] =
        `${node.i}${node.j}` in bestPaths
          ? bestPaths[`${node.i}${node.j}`]
          : distance;
      if (bestPaths[`${node.i}${node.j}`] > distance) {
        bestPaths[`${node.i}${node.j}`] = distance;
      }
    }
  }
  const paths = Object.values(bestPaths);
  return paths.length > 0
    ? paths.reduce((sum: number, a: number) => sum + a, 0)
    : -1;
}

console.log(
  minStepsToDeliver([
    ["S", ".", "G"],
    [".", "#", "."],
    ["G", ".", "."],
  ])
);
// Result: 4

/* 
Explanation:
- Minimum distance from S (0,0) to G (0,2): 2 steps
- Minimum distance from S (0,0) to G (2,0): 2 steps
- Total: 2 + 2 = 4
*/

console.log(
  minStepsToDeliver([
    ["S", "#", "G"],
    ["#", "#", "."],
    ["G", ".", "."],
  ])
);
// Result: -1
// (The house at (0,2) is unreachable due to obstacles)

console.log(minStepsToDeliver([["S", "G"]]));
// Result: 1

console.log(minStepsToDeliver([["S", "G", "G", "G"]]));
// Result: 6

/* 
Difficulty: medium
Grade: ⭐⭐
Code review: 2/5
Strengths:
• The code attempts to use BFS for pathfinding, which is appropriate for this problem.
• It correctly identifies the starting position 'S'.
Weak points:
• The BFS implementation is flawed. The `visited` array is passed by value and recreated for each neighbor, which does not prevent cycles effectively. A global `visited` set or a 2D array is needed for BFS.
• The `search` function returns -1 for visited nodes, but this return value is not handled correctly in the main loop. It also returns -1 if the current node is not 'G', which is incorrect for a BFS traversal.
• The `bestPaths` logic is incorrect. It tries to store paths based on the current node's coordinates (`${node.i}${node.j}`) rather than the target 'G' coordinates. It also overwrites paths unnecessarily.
• The `visited` array in the `Node` type is intended to track visited cells for a single path, but BFS requires tracking visited cells globally for the entire search from 'S' to avoid redundant exploration and infinite loops.
• The `queue.shift()` operation is inefficient for large queues. A more performant queue implementation or a different data structure might be considered for very large grids, though for typical competitive programming scenarios, it's often acceptable.
• The logic for calculating the total distance is flawed because `bestPaths` is not populated correctly with distances to 'G' nodes.
• The code does not correctly handle the case where a 'G' is unreachable. It will likely return 0 or an incorrect sum instead of -1.
Next steps:
• Implement a standard BFS algorithm. This typically involves a queue and a way to mark visited cells (e.g., a 2D boolean array or a Set of stringified coordinates) that is shared across all explorations from the starting point.
• Modify the BFS to specifically find the shortest distance from 'S' to each 'G'. When a 'G' is found, record its distance and stop exploring that particular path further if a shorter path to that 'G' has already been found.
• Ensure that if any 'G' is unreachable after the BFS completes, the function returns -1.
• Refactor the `search` function to be part of the BFS loop, managing the queue and visited set correctly. The `search` function as a standalone recursive-like function within the loop is not the standard BFS pattern.
• The `visited` tracking needs to be global to the BFS for a given 'S' to 'G' pathfinding, not local to each node in the queue.
*/
