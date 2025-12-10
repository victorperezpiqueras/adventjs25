/* 
🎄 Depth of Christmas Magic
At the North Pole, Santa Claus is reviewing the magical letters 📩✨ he receives from children all over the world. These letters use an ancient Christmas language in which the brackets [ and ] represent the intensity of the wish.

The deeper the nesting of the brackets, the stronger the wish. Your mission is to find out the maximum depth at which the [] are nested.

But be careful! Some letters may be poorly written. If the brackets are not properly balanced (if one closes before it opens, there are extra closing brackets, or closing brackets are missing), the letter is invalid and you must return -1.

maxDepth('[]') // -> 1
maxDepth('[[]]') // -> 2
maxDepth('[][]') // -> 1
maxDepth('[[][]]') // -> 2
maxDepth('[[[]]]') // -> 3
maxDepth('[][[]][]') // -> 2

maxDepth('][') // -> -1 (closes before opening)
maxDepth('[[[') // -> -1 (missing closing brackets)
maxDepth('[]]]') // -> -1 (extra closing brackets)
maxDepth('[][][') // -> -1 (one remains unclosed)
// */

function maxDepth(s: string): number {
  const parts = s.split("");

  let count = 0;
  let maxDepth = 0;
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    if (part === "[") {
      count++;
      maxDepth = count > maxDepth ? count : maxDepth;
    } else if (part === "]") {
      count--;
    }
    if (count < 0) {
      return -1;
    }
  }

  return count === 0 ? maxDepth : -1;
}

console.log(maxDepth("[]")); // -> 1
console.log(maxDepth("[[]]")); // -> 2
console.log(maxDepth("[][]")); // -> 1
console.log(maxDepth("[[][]]")); // -> 2
console.log(maxDepth("[[[]]]")); // -> 3
console.log(maxDepth("[][[]][]")); // -> 2
console.log(maxDepth("][")); // -> -1 (closes before opening)
console.log(maxDepth("[[[")); // -> -1 (missing closing brackets)
console.log(maxDepth("[]]]")); // -> -1 (extra closing brackets)
console.log(maxDepth("[][][")); // -> -1 (one remains unclosed)

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly handles all specified edge cases for bracket balancing.
• The algorithm is efficient, using a single pass through the string.
• Variable names are clear and descriptive.
• TypeScript types are used appropriately.
*/
