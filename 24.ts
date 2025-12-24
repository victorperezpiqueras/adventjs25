/* 
At the North Pole, the elves have two magical binary trees that generate energy 🌲🌲 to keep the Christmas star ⭐️ shining. However, for them to work properly, the trees must be in perfect sync like mirrors 🪞.

Two binary trees are mirrors if:

The roots of both trees have the same value.
Each node of the first tree must have its corresponding node in the opposite position in the second tree.
And the tree is represented with three properties value, left, and right. The latter two display the remaining branches (if any):

const tree = {
  value: '⭐️',
  left: {
    value: '🎅'
    // left: {...}
    // right: { ... }
  },
  right: {
    value: '🎁'
    // left: { ... }
    // right: { ...&nbsp;}
  }
}
Santa needs your help to verify if the trees are synchronized so that the star can keep shining. You must return an array where the first position indicates if the trees are synchronized and the second position returns the value of the root of the first tree.

const tree1 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

const tree2 = {
  value: '🎄',
  left: { value: '🎅' }
  right: { value: '⭐' },
}

isTreesSynchronized(tree1, tree2) // [true, '🎄']

/*
  tree1          tree2
   🎄              🎄
  / \             / \
⭐   🎅         🎅   ⭐
*/

/* const tree3 = {
  value: '🎄',
  left: { value: '🎅' },
  right: { value: '🎁' }
}

isTreesSynchronized(tree1, tree3) // [false, '🎄']

const tree4 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

isTreesSynchronized(tree1, tree4) // [false, '🎄']

isTreesSynchronized(
  { value: '🎅' },
  { value: '🧑‍🎄' }
) // [false, '🎅']
 */

function isTreesSynchronized(tree1, tree2) {
  // 5 stars
  let result = true;
  if (tree1?.["value"] !== tree2?.["value"]) {
    result = false;
  }
  if (tree1["left"] != null) {
    result = result && isTreesSynchronized(tree1["left"], tree2["right"])[0];
  }
  if (tree1["right"] != null) {
    result = result && isTreesSynchronized(tree1["right"], tree2["left"])[0];
  }

  return [result, tree1["value"]];
}

/* 
Difficulty: medium
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly implements the logic for checking if two binary trees are mirrors.
• It handles null/undefined nodes gracefully using optional chaining.
• The recursive approach is appropriate for tree traversal.
• The function returns the expected output format.
*/
