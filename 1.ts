/* 
Santa has received a list of gifts, but some are defective. A gift is defective if its name contains the # character.

Help Santa by writing a function that takes a list of gift names and returns a new list that only contains the non-defective gifts.

Examples
const gifts1 = ['car', 'doll#arm', 'ball', '#train']
const good1 = filterGifts(gifts1)
console.log(good1)
// ['car', 'ball']

const gifts2 = ['#broken', '#rusty']
const good2 = filterGifts(gifts2)
console.log(good2)
// []

const gifts3 = []
const good3 = filterGifts(gifts3)
console.log(good3)
// []
 */

function filterGifts(gifts: string[]): string[] {
  const filteredGifts: string[] = gifts.filter(
    (gift: string) => !gift.includes("#")
  );
  return filteredGifts;
}

const gifts1 = ["car", "doll#arm", "ball", "#train"];
const good1 = filterGifts(gifts1);
console.log(good1);
// ['car', 'ball']

const gifts2 = ["#broken", "#rusty"];
const good2 = filterGifts(gifts2);
console.log(good2);
// []

const gifts3 = [];
const good3 = filterGifts(gifts3);
console.log(good3);

/* 
Difficulty: easy
Grade: ⭐⭐⭐⭐⭐
Code review: 9/10
✓ Strengths:
• The code is concise and effectively uses the `filter` method.
• The logic for filtering is straightforward and easy to understand.
⚠ Weak points:
• The function lacks type annotations for its parameter and return value, making it less robust and harder to reason about in a TypeScript context.
→ Next steps:
• Add type annotations for the `gifts` parameter (e.g., `string[]`) and the return type (e.g., `string[]`) to improve type safety and clarity.
*/
