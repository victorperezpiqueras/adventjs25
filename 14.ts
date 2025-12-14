/* 
At the North Pole, the elves have simplified their storage system to avoid mistakes.
They now keep the presents in a magical object with limited depth, where each value appears only once.

Santa needs a quick way to know which path of keys he must follow to find a specific present.

Your task is to write a function that, given an object and a value, returns the array of keys that must be traversed to reach that value.

Rules:

The object has at most 3 levels of depth.
The value to search for appears at most once.
The object only contains other objects and primitive values (strings, numbers, booleans).
If the value does not exist, return an empty array.
Examples:

const workshop = {
  storage: {
    shelf: {
      box1: 'train',
      box2: 'switch'
    },
    box: 'car'
  },
  gift: 'doll'
}

findGiftPath(workshop, 'train')
// ➜ ['storage', 'shelf', 'box1']

findGiftPath(workshop, 'switch')
// ➜ ['storage', 'shelf', 'box2']

findGiftPath(workshop, 'car')
// ➜ ['storage', 'box']

findGiftPath(workshop, 'doll')
// ➜ ['gift']

findGiftPath(workshop, 'plane')
// ➜ []
 */

type Gift = string | number | boolean;
type Workshop = Record<string, any>;
type Path = string[];

function findGiftPath(workshop: Workshop, gift: Gift): Path {
  let path = [];
  const elements = Object.entries(workshop);

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const key = element[0];
    const value = element[1];
    if (value === gift) {
      path.unshift(key);
      break;
    } else {
      if (typeof value === "object") {
        const otherPath = findGiftPath(value, gift);
        if (otherPath.length > 0) {
          path = [key].concat(otherPath);
          break;
        }
      }
    }
  }

  return path;
}

const workshop = {
  storage: {
    shelf: {
      box1: "train",
      box2: "switch",
    },
    box: "car",
  },
  gift: "doll",
};

console.log(findGiftPath(workshop, "train"));
// ➜ ['storage', 'shelf', 'box1']

console.log(findGiftPath(workshop, "switch"));
// ➜ ['storage', 'shelf', 'box2']

console.log(findGiftPath(workshop, "car"));
// ➜ ['storage', 'box']

console.log(findGiftPath(workshop, "doll"));
// ➜ ['gift']

console.log(findGiftPath(workshop, "plane"));
// ➜ []

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly implements a recursive search for the gift path within the specified object depth.
• It handles the case where the gift is not found by returning an empty array.
• The use of `Object.entries` and recursion is appropriate for the problem.
• TypeScript types are used effectively to define the expected input and output structures.
*/
