/* 
Santa Claus 🎅 is testing a new sleigh simulator inside a maze in the workshop. The maze is represented as a matrix of characters.

Your task is to implement a function that determines if it is possible to reach the exit (E) starting from the initial position (S).

Maze rules:

S: Santa's initial position.
E: Maze exit.
.: Free path.
#: Wall (blocks the path).
Allowed movements: up, down, left, and right.
There is only one S and one E.
canEscape([
  ['S', '.', '#', '.'],
  ['#', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['#', '#', '#', 'E']
])
// → true

canEscape([
  ['S', '#', '#'],
  ['.', '#', '.'],
  ['.', '#', 'E']
])
// → false

canEscape([
  ['S', 'E']
])
// → true

canEscape([
  ['S', '.', '.', '.', '.'],
  ['#', '#', '#', '#', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '#', '#', '#', '#'],
  ['.', '.', '.', '.', 'E']
])
// → true

canEscape([
  ['S', '.', '.'],
  ['.', '.', '.'],
  ['#', '#', '#'],
  ['.', '.', 'E']
])
// → false
Things to keep in mind:

You don't need to return the path, just if it is possible to arrive.
Santa cannot leave the boundaries of the maze.
You can pass through the same cell multiple times.
Tip: This problem can be solved in several ways, but search algorithms like BFS (Breadth-First Search) or DFS (Depth-First Search) are ideal for these types of challenges.
 */

function canEscape(maze: string[][]): boolean {
  type Node = {
    value: string;
    visited: boolean;
    i: number;
    j: number;
    links: number[][];
  };
  let nodes: Record<string, Node> = {};
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      let links = [];
      if (i > 0 && maze[i - 1][j] !== "#") {
        links.push([i - 1, j]);
      }
      if (j > 0 && maze[i][j - 1] !== "#") {
        links.push([i, j - 1]);
      }
      if (i < maze.length - 1 && maze[i + 1][j] !== "#") {
        links.push([i + 1, j]);
      }
      if (j < maze[i].length - 1 && maze[i][j + 1] !== "#") {
        links.push([i, j + 1]);
      }
      nodes[`${i}${j}`] = {
        value: maze[i][j],
        visited: false,
        i,
        j,
        links: [...links],
      };
    }
  }
  let visited: Set<string> = new Set();
  function search(i: number, j: number, nodes: Record<string, Node>): boolean {
    const node = nodes[`${i}${j}`];
    visited.add(`${i}${j}`);

    if (node.value === "E") {
      return true;
    }
    for (let index = 0; index < node.links.length; index++) {
      const link = node.links[index];
      if (visited.has(`${link[0]}${link[1]}`)) {
        continue;
      }
      const linkValue = search(link[0], link[1], nodes);
      if (linkValue) {
        return true;
      }
    }
    return false;
  }

  return search(0, 0, nodes);
}

console.log(
  canEscape([
    ["S", ".", "#", "."],
    ["#", ".", "#", "."],
    [".", ".", ".", "."],
    ["#", "#", "#", "E"],
  ])
);
// → true

console.log(
  canEscape([
    ["S", "#", "#"],
    [".", "#", "."],
    [".", "#", "E"],
  ])
);
// → false

console.log(canEscape([["S", "E"]]));
// → true

console.log(
  canEscape([
    ["S", ".", ".", ".", "."],
    ["#", "#", "#", "#", "."],
    [".", ".", ".", ".", "."],
    [".", "#", "#", "#", "#"],
    [".", ".", ".", ".", "E"],
  ])
);
// → true

console.log(
  canEscape([
    ["S", ".", "."],
    [".", ".", "."],
    ["#", "#", "#"],
    [".", ".", "E"],
  ])
);
// → false

/* 
Difficulty: hard
Grade: ⭐⭐⭐
Code review: 3/5
Strengths:
• The code correctly identifies the start and end points and builds a graph representation of the maze.
• TypeScript types are used appropriately for the maze structure and internal node representation.
Weak points:
• The DFS implementation has a flaw: it assumes the starting point 'S' is always at (0,0). This will fail if 'S' is located elsewhere in the maze.
• The DFS implementation does not correctly handle cycles or revisiting nodes in a way that guarantees finding the exit if a path exists. The `visited` set is global to the `search` function, meaning once a node is marked visited, it's never explored again from a different path, which is incorrect for this problem where revisiting is allowed and sometimes necessary.
• The graph construction logic for `links` is slightly inefficient as it recalculates neighbors for every cell, and the `nodes` object uses string keys which can be less performant than direct array access or a Map.
• The `search` function is recursive and could lead to a stack overflow for very large mazes.
Next steps:
• Modify the code to first find the actual coordinates of 'S' and use those as the starting point for the search.
• Rethink the `visited` mechanism. For a maze where revisiting is allowed, a simple `visited` set that prevents re-exploration from any path is incorrect. A BFS approach with a queue and a visited set that tracks visited *states* (e.g., `i,j`) is more appropriate and robust.
• Consider using a `Map` for `nodes` or directly using the `maze` array with a separate `visited` 2D array to avoid string key lookups and potentially simplify graph representation.
• For large mazes, an iterative DFS or BFS implementation would be safer than a recursive DFS to prevent stack overflows.
*/
