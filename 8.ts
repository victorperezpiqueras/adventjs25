/* 
Santa 🎅 wants to know what the first non-repeated letter is in a toy's name 🎁.

Write a function that takes a string and returns the first letter that is not repeated, ignoring uppercase and lowercase when counting, but returning the letter as it appears in the string.

If there is none, return an empty string ("").

Examples:

findUniqueToy('Gift') // 'G'
// ℹ️ The G is the first letter that is not repeated
// and we return it exactly as it appears

findUniqueToy('sS') // ''
// ℹ️ The letters are repeated, since it doesn't distinguish uppercase

findUniqueToy('reindeeR') // 'i'
// ℹ️ The r is repeated (even if it's uppercase)
// and the e as well, so the first one is 'i'

// More cases:
findUniqueToy('AaBbCc') // ''
findUniqueToy('abcDEF') // 'a'
findUniqueToy('aAaAaAF') // 'F'
findUniqueToy('sTreSS') // 'T'
findUniqueToy('z') // 'z'
*/

function findUniqueToy(toy: string): string {
  const toys = toy.split("");
  let counter = {};
  for (let index = 0; index < toys.length; index++) {
    const letter = toys[index].toLowerCase();
    counter[letter] = letter in counter ? counter[letter] + 1 : 1;
  }

  for (let index = 0; index < toys.length; index++) {
    const letter = toys[index];
    if (counter[letter.toLowerCase()] === 1) {
      return letter;
    }
  }

  return "";
}

console.log(findUniqueToy("Gift")); // 'G'
// ℹ️ The G is the first letter that is not repeated
// and we return it exactly as it appears

console.log(findUniqueToy("sS")); // ''
// ℹ️ The letters are repeated, since it doesn't distinguish uppercase

console.log(findUniqueToy("reindeeR")); // 'i'
// ℹ️ The r is repeated (even if it's uppercase)
// and the e as well, so the first one is 'i'

// More cases:
console.log(findUniqueToy("AaBbCc")); // ''
console.log(findUniqueToy("abcDEF")); // 'a'
console.log(findUniqueToy("aAaAaAF")); // 'F'
console.log(findUniqueToy("sTreSS")); // 'T'
console.log(findUniqueToy("z")); // 'z'

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 5/5
Strengths:
• The code correctly identifies and returns the first non-repeated character, handling case-insensitivity as required.
• The use of a frequency map (counter object) is an efficient approach for this problem.
• The code is clear, readable, and follows standard JavaScript/TypeScript practices.
• TypeScript types are used appropriately, and the logic is sound.
*/
